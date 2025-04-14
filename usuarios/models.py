from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    es_periodista = models.BooleanField(default=False)


    def __str__(self):
        return self.username
