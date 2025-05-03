from rest_framework import serializers
from .models import Noticia


class NoticiaSerializer(serializers.ModelSerializer):
    periodista = serializers.StringRelatedField(read_only=True)
    original = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Noticia
        fields = [
            'id', 'titulo', 'contenido', 'imagen', 'fecha_publicacion',
            'aprobado', 'periodista', 'estado', 'original', 'justificacion_rechazo'
        ]
        read_only_fields = [
            'fecha_publicacion', 'aprobado', 'periodista', 'estado', 'original'
        ]

    def update(self, instance, validated_data):
        # Solo actualiza imagen si se incluye en los datos
        imagen = validated_data.get('imagen', None)
        if imagen is not None:
            instance.imagen = imagen

        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.contenido = validated_data.get('contenido', instance.contenido)
        instance.save()
        return instance