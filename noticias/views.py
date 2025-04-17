from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Noticia
from .serializers import NoticiaSerializer
from rest_framework.exceptions import PermissionDenied

# ✅ Vista separada para noticias del periodista logueado
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mis_noticias(request):
    noticias = Noticia.objects.filter(periodista=request.user)
    serializer = NoticiaSerializer(noticias, many=True)
    return Response(serializer.data)

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    permission_classes = [permissions.AllowAny]  # todos pueden ver las noticias públicas

    def get_queryset(self):
        user = self.request.user

        # Invitados: solo noticias aprobadas
        if not user.is_authenticated:
            return Noticia.objects.filter(aprobado=True)

        # Admin: ve todo
        if user.is_staff:
            return Noticia.objects.all()

        # Periodistas: ven solo noticias aprobadas
        return Noticia.objects.filter(aprobado=True)

    def perform_create(self, serializer):
        serializer.save(periodista=self.request.user, estado='pendiente')

    def perform_destroy(self, instance):
        if instance.periodista != self.request.user:
            raise PermissionDenied("Solo puedes eliminar tus propias noticias.")
        instance.delete()

    def perform_update(self, serializer):
        if self.get_object().periodista != self.request.user:
            raise PermissionDenied("No puedes editar noticias de otros.")
        serializer.save()
