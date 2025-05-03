from django.db import models
from usuarios.models import Usuario

class Noticia(models.Model):
    original = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL, related_name="ediciones"
    )

    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
        ("modificada", "Pendiente de Edición"),
    ]

    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    aprobado = models.BooleanField(default=False)
    periodista = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="noticias")
    imagen = models.ImageField(upload_to='noticias/', null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    justificacion_rechazo = models.TextField(null=True, blank=True)  # Nuevo campo

    def __str__(self):
        return self.titulo
