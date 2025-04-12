from django.urls import path
from .views import obtener_noticias

urlpatterns = [
    path('', obtener_noticias, name='obtener_noticias'),
]

