from rest_framework import viewsets
from .models import Comentario
from .serializers import ComentarioSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

        
    def perform_destroy(self, instance):
        if instance.usuario != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("No puedes eliminar comentarios de otros usuarios.")
        instance.delete()