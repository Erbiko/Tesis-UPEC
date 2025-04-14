from rest_framework import viewsets, permissions
from .models import Noticia
from .serializers import NoticiaSerializer

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    permission_classes = [permissions.AllowAny]  # Esto lo ajustaremos después según el rol
