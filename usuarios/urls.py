from django.urls import path
from .views import registrar_invitado
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('registro/', registrar_invitado, name='registro_invitado'),
    path('login/', obtain_auth_token, name='login_usuario'),
]