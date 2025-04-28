from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import RegistroInvitadoSerializer
from django.contrib.auth import get_user_model

Usuario = get_user_model()

# 🔐 REGISTRO DE INVITADO
@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_invitado(request):
    serializer = RegistroInvitadoSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Añadir al grupo "Invitados"
        grupo, _ = Group.objects.get_or_create(name="Invitados")
        user.groups.add(grupo)

        # Generar token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "mensaje": "Usuario registrado correctamente.",
            "token": token.key,
            "usuario": user.username
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔑 LOGIN PARA TODOS LOS USUARIOS
class LoginAPI(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user

        # 🔍 Determinar el rol
        if user.is_staff:
            rol = "admin"
        elif getattr(user, "es_periodista", False):
            rol = "periodista"
        else:
            rol = "invitado"

        return Response({
            "token": token.key,
            "usuario": user.username,
            "rol": rol
        })

# 🔍 LISTAR USUARIOS
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Solo usuarios autenticados pueden acceder
def listar_usuarios(request):
    usuarios = Usuario.objects.all()
    data = [
        {
            "id": usuario.id,
            "username": usuario.username,
            "email": usuario.email,
            "is_staff": usuario.is_staff,
            "es_periodista": getattr(usuario, "es_periodista", False),
        }
        for usuario in usuarios
    ]
    return Response(data, status=status.HTTP_200_OK)

# ✏️ ACTUALIZAR USUARIO
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])  # Solo administradores pueden editar usuarios
def actualizar_usuario(request, id):
    try:
        usuario = Usuario.objects.get(id=id)
    except Usuario.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    serializer = RegistroInvitadoSerializer(usuario, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"mensaje": "Usuario actualizado correctamente"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🗑️ ELIMINAR USUARIO
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_usuario(request, id):
    try:
        usuario = Usuario.objects.get(id=id)
    except Usuario.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    # Verificar si el usuario autenticado es administrador
    if not request.user.is_staff:
        return Response({"error": "No tienes permisos para realizar esta acción"}, status=status.HTTP_403_FORBIDDEN)

    usuario.delete()
    return Response({"mensaje": "Usuario eliminado correctamente"}, status=status.HTTP_200_OK)

# 🆕 CREAR USUARIO
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_usuario(request):
    serializer = RegistroInvitadoSerializer(data=request.data)
    if serializer.is_valid():
        usuario = serializer.save()
        usuario.set_password(request.data['password'])  # Establece la contraseña
        usuario.save()
        return Response({"mensaje": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)