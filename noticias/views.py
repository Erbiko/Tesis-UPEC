from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Noticia
from .serializers import NoticiaSerializer

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer



@api_view(['GET'])
def obtener_noticias(request):
    noticias = Noticia.objects.all()
    serializer = NoticiaSerializer(noticias, many=True)
    return Response(serializer.data)