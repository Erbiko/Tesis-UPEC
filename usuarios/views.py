from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
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