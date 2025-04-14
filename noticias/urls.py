from rest_framework.routers import DefaultRouter
from .views import NoticiaViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', NoticiaViewSet)  # Esto maneja /api/noticias/ y /api/noticias/<id>/

urlpatterns = [
    path('', include(router.urls)),
]
