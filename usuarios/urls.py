from django.urls import path
from .views import registrar_invitado
from .views import LoginAPI

urlpatterns = [
    path('registro/', registrar_invitado, name='registro_invitado'),
    path('login/',LoginAPI.as_view(), name='login_usuario'),
]