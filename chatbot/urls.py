from django.urls import path
from .views import procesar_pregunta

urlpatterns = [
    path('preguntar/', procesar_pregunta, name='procesar_pregunta'),
]