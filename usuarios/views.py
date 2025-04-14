from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegistroInvitadoSerializer

@api_view(['POST'])
def registrar_invitado(request):
    serializer = RegistroInvitadoSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Crear un token de autenticación para este usuario
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "mensaje": "Usuario invitado registrado correctamente.",
            "token": token.key,
            "usuario": user.username
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
