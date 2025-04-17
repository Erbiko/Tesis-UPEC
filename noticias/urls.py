from rest_framework.routers import DefaultRouter
from .views import NoticiaViewSet, mis_noticias
from django.urls import path, include

router = DefaultRouter()
router.register(r'', NoticiaViewSet)

urlpatterns = [
    path('mis/', mis_noticias, name='mis_noticias'),
    path('', include(router.urls)),
]
