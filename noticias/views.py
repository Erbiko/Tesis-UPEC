from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Noticia
from .serializers import NoticiaSerializer
from django.db import transaction

#el administrador podra aprobar y rechazar noticias pendientes y modificadas   
@api_view(['GET'])
@permission_classes([IsAdminUser])
def noticias_pendientes(request):
    noticias = Noticia.objects.filter(aprobado=False, estado__in=["pendiente", "modificada"])
    serializer = NoticiaSerializer(noticias, many=True)
    return Response(serializer.data)




# el periodista podrá gestionar sus propias noticias
@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def gestionar_noticia(request, pk):
    try:
        noticia = Noticia.objects.get(pk=pk, periodista=request.user)
    except Noticia.DoesNotExist:
        return Response({"error": "No tienes permiso para acceder a esta noticia."}, status=404)

    if request.method == 'GET':
        serializer = NoticiaSerializer(noticia)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = NoticiaSerializer(noticia, data=request.data, partial=True)
        if serializer.is_valid():
            noticia.estado = 'modificada'
            noticia.aprobado = False
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        if noticia.estado == 'aprobada':
            return Response({"error": "No puedes eliminar una noticia aprobada."}, status=403)
        noticia.delete()
        return Response(status=204)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mis_noticias(request):
    noticias = Noticia.objects.filter(periodista=request.user)
    serializer = NoticiaSerializer(noticias, many=True)
    return Response(serializer.data)


class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user = self.request.user

        # Si no está autenticado, solo noticias aprobadas
        if not user.is_authenticated:
            return Noticia.objects.filter(aprobado=True, estado="aprobada")

        # Si es admin o periodista, en esta vista, solo noticias aprobadas
        return Noticia.objects.filter(aprobado=True, estado="aprobada")


    def perform_create(self, serializer):
        serializer.save(periodista=self.request.user, estado='pendiente', aprobado=False)

    def perform_destroy(self, instance):
        if instance.estado == 'pendiente':
            raise PermissionDenied("No puedes eliminar una noticia que está en revisión.")
        instance.delete()

    def perform_update(self, serializer):
        noticia = self.get_object()
        # Obtener los datos actuales y los nuevos datos
        nuevos_datos = serializer.validated_data
        cambios_realizados = False

        # Comparar los campos editables
        for campo in ['titulo', 'contenido', 'imagen']:
            if campo in nuevos_datos and getattr(noticia, campo) != nuevos_datos[campo]:
                cambios_realizados = True
                break

        # Cambiar el estado a "modificada" solo si hubo cambios
        if cambios_realizados and noticia.estado in ['rechazada', 'pendiente']:
            serializer.save(estado='modificada')
        else:
            serializer.save()


    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def pendientes(self, request):
        # Filtrar noticias con estado "pendiente" o "modificada"
        pendientes = Noticia.objects.filter(aprobado=False, estado__in=['pendiente', 'modificada'])
        serializer = NoticiaSerializer(pendientes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put'], permission_classes=[IsAdminUser])
    def aprobar(self, request, pk=None):
        noticia = self.get_object()

        # Si la noticia está en estado "modificada", reemplazar la original
        if noticia.estado == 'modificada' and noticia.original:
            try:
                original = noticia.original
                with transaction.atomic():
                    original.titulo = noticia.titulo
                    original.contenido = noticia.contenido
                    if noticia.imagen:
                        original.imagen = noticia.imagen
                    original.aprobado = True
                    original.estado = 'aprobada'
                    original.save()
                    noticia.delete()
                return Response({'mensaje': 'Noticia modificada aprobada y original actualizada'})
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Si la noticia está en estado "pendiente", simplemente aprobarla
        noticia.aprobado = True
        noticia.estado = 'aprobada'
        noticia.save()
        return Response({'mensaje': 'Noticia aprobada'})

    @action(detail=True, methods=['put'], permission_classes=[IsAdminUser])
    def rechazar(self, request, pk=None):
        noticia = self.get_object()
        justificacion_rechazo = request.data.get('justificacion_rechazo')

        if not justificacion_rechazo:
            return Response(
                {"detail": "Debe proporcionar una justificación para rechazar la noticia."},
                status=status.HTTP_400_BAD_REQUEST
            )

        noticia.estado = 'rechazada'
        noticia.justificacion_rechazo = justificacion_rechazo
        noticia.save()

        return Response({"detail": "Noticia rechazada exitosamente."}, status=status.HTTP_200_OK)
    


