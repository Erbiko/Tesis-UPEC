from rest_framework.routers import DefaultRouter
from .views import NoticiaViewSet, mis_noticias, gestionar_noticia, obtener_noticia_admin
from django.urls import path, include

router = DefaultRouter()
router.register(r'', NoticiaViewSet)  # Agrega el prefijo "noticias"

urlpatterns = [
    path('mis/', mis_noticias, name='mis_noticias'),  # Ruta personalizada para "mis noticias"
    path('mis/<int:pk>/', gestionar_noticia, name='gestionar_noticia'),
    path('noticias/admin/<int:pk>/', obtener_noticia_admin, name='noticia-admin-detalle'),
    path('', include(router.urls)),
]
