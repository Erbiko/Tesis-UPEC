from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

Usuario = get_user_model()

class RegistroInvitadoSerializer(serializers.ModelSerializer):
    rol = serializers.CharField(write_only=True)  # Campo virtual para manejar roles
    password = serializers.CharField(write_only=True, required=False)  # Campo opcional para editar

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'rol']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        rol = validated_data.pop('rol')  # Extrae el rol del usuario
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        # Asigna los roles basados en el campo `rol`
        if rol == 'admin':
            user.is_staff = True
        elif rol == 'periodista':
            user.es_periodista = True
        user.save()
        return user

    def update(self, instance, validated_data):
        # Actualiza los campos del usuario
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        # Actualiza el rol si se proporciona
        rol = validated_data.get('rol')
        if rol:
            instance.is_staff = (rol == 'admin')
            instance.es_periodista = (rol == 'periodista')
            if rol == 'invitado':
                instance.is_staff = False
                instance.es_periodista = False

        # Actualiza la contraseña si se proporciona
        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance
