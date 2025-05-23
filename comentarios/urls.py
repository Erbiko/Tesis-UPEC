from rest_framework.routers import DefaultRouter
from .views import ComentarioViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', ComentarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
