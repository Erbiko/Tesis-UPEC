from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

Usuario = get_user_model()

class RegistroInvitadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            es_periodista=False
        )

        grupo, _ = Group.objects.get_or_create(name='Invitados')
        user.groups.add(grupo)
        return user
