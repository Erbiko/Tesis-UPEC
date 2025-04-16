from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import Usuario

class CustomUserAdmin(UserAdmin):
    model = Usuario
    add_form = UserCreationForm
    form = UserChangeForm

    list_display = ("username", "email", "is_staff", "es_periodista")
    list_filter = ("es_periodista", "is_staff")
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("es_periodista",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("es_periodista",)}),
    )

admin.site.register(Usuario, CustomUserAdmin)
