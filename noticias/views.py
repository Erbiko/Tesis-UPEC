from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Noticia
from .serializers import NoticiaSerializer


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
        if not user.is_authenticated:
            return Noticia.objects.filter(aprobado=True)
        if user.is_staff:
            return Noticia.objects.all()
        if getattr(user, "es_periodista", False):
            return Noticia.objects.filter(periodista=user)
        return Noticia.objects.filter(aprobado=True)

    def perform_create(self, serializer):
        serializer.save(periodista=self.request.user, estado='pendiente', aprobado=False)

    def perform_destroy(self, instance):
        if instance.periodista != self.request.user and not self.request.user.is_staff:
            raise PermissionDenied("Solo puedes eliminar tus propias noticias.")
        instance.delete()

    def perform_update(self, serializer):
        if self.get_object().periodista != self.request.user and not self.request.user.is_staff:
            raise PermissionDenied("No puedes editar noticias de otros.")
        serializer.save()

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def pendientes(self, request):
        pendientes = Noticia.objects.filter(aprobado=False)
        serializer = NoticiaSerializer(pendientes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put'], permission_classes=[IsAdminUser])
    def aprobar(self, request, pk=None):
        noticia = self.get_object()
        noticia.aprobado = True
        noticia.estado = 'aprobada'
        noticia.save()
        return Response({'mensaje': 'Noticia aprobada'})

    @action(detail=True, methods=['put'], permission_classes=[IsAdminUser])
    def rechazar(self, request, pk=None):
        noticia = self.get_object()
        noticia.estado = 'rechazada'
        noticia.aprobado = False
        noticia.save()
        return Response({'mensaje': 'Noticia rechazada'})
