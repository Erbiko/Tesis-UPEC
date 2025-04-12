from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    es_periodista = models.BooleanField(default=False)
    es_administrador = models.BooleanField(default=False)
    
    # Relacionar estos campos con un nombre personalizado para evitar los conflictos
    groups = models.ManyToManyField(
        'auth.Group', 
        related_name='usuario_set',  # Cambiar el related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', 
        related_name='usuario_permissions',  # Cambiar el related_name
        blank=True
    )
    
    def __str__(self):
        return self.username
