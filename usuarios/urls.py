from django.urls import path
from .views import registrar_invitado, LoginAPI, listar_usuarios, actualizar_usuario, eliminar_usuario, crear_usuario

urlpatterns = [
    path('registro/', registrar_invitado, name='registro_invitado'),
    path('login/', LoginAPI.as_view(), name='login_usuario'),
    path('', listar_usuarios, name='listar_usuarios'),  # Ruta para listar usuarios
    path('<int:id>/', actualizar_usuario, name='actualizar_usuario'),  # Ruta para actualizar usuario
    path('<int:id>/eliminar/', eliminar_usuario, name='eliminar_usuario'),  # Ruta para eliminar usuario
    path('crear/', crear_usuario, name='crear_usuario'),
]