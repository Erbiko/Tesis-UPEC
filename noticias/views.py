from rest_framework import viewsets, permissions
from .models import Noticia
from .serializers import NoticiaSerializer

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    permission_classes = [permissions.IsAuthenticated]  # Cambiado a IsAuthenticated para requerir autenticación

    def perform_create(self, serializer):
        serializer.save(periodista=self.request.user, estado='pendiente')
