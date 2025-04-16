from django.contrib import admin

# Register your models here.

from .models import Noticia

@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'periodista', 'aprobado', 'fecha_publicacion']
    list_filter = ['aprobado', 'fecha_publicacion']
    search_fields = ['titulo', 'contenido']
