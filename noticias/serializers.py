from rest_framework import serializers
from .models import Noticia


class NoticiaSerializer(serializers.ModelSerializer):
    periodista = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Noticia
        fields = ['id', 'titulo', 'contenido', 'fecha_publicacion', 'aprobado', 'periodista', 'imagen']
        read_only_fields = ['periodista', 'aprobado', 'fecha_publicacion']