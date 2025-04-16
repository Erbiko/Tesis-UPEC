from rest_framework import viewsets, permissions
from .models import Noticia
from .serializers import NoticiaSerializer

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    permission_classes = [permissions.AllowAny]  # Permitimos acceso para lectura

    def get_queryset(self):
        user = self.request.user

        # Administrador: ve todo
        if user.is_authenticated and user.is_staff:
            return Noticia.objects.all()

        # Periodista: ve solo sus propias noticias
        elif user.is_authenticated and hasattr(user, 'es_periodista') and user.es_periodista:
            return Noticia.objects.filter(periodista=user)

        # Invitados: solo noticias aprobadas
        return Noticia.objects.filter(aprobado=True)

    def perform_create(self, serializer):
        serializer.save(periodista=self.request.user, estado='pendiente')
