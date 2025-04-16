from rest_framework import serializers
from .models import Comentario

class ComentarioSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)  # Esta línea es clave

    class Meta:
        model = Comentario
        fields = ['id', 'noticia', 'usuario', 'contenido']
        read_only_fields = ['usuario', 'fecha_comentario']