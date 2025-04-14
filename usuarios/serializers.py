from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.utils.crypto import get_random_string

Usuario = get_user_model()

class RegistroInvitadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'email']

    def create(self, validated_data):
        password = get_random_string(12)
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            es_periodista=False  # 👈 importante
)

        grupo, _ = Group.objects.get_or_create(name='Invitados')
        user.groups.add(grupo)
        return user
