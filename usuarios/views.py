from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistroInvitadoSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_invitado(request):
    serializer = RegistroInvitadoSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "mensaje": "Usuario invitado registrado correctamente.",
            "token": token.key,
            "usuario": user.username
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
