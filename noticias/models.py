from django.db import models
from usuarios.models import Usuario

class Noticia(models.Model):
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    aprobado = models.BooleanField(default=False)
    periodista = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="noticias")
    imagen = models.ImageField(upload_to='noticias/', null=True, blank=True)

    def __str__(self):
        return self.titulo
