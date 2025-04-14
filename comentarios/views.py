from rest_framework import viewsets
from .models import Comentario
from .serializers import ComentarioSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
