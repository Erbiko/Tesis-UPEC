from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from sentence_transformers import SentenceTransformer
import numpy as np
import json
import requests
from rest_framework.permissions import AllowAny
import os

# Cargar el modelo de embeddings
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Cargar los embeddings generados
embeddings_path = os.path.join(os.path.dirname(__file__), "embeddings.json")
with open(embeddings_path, "r", encoding="utf-8") as file:
    embeddings_data = json.load(file)

embeddings = np.array([np.array(item["embedding"]) for item in embeddings_data])
textos = [item["texto"] for item in embeddings_data]

# URL de la API de Ollama
OLLAMA_API_URL = "http://localhost:11434/api/generate"

@api_view(['POST'])
@permission_classes([AllowAny])
def procesar_pregunta(request):
    pregunta = request.data.get('pregunta', '')

    if not pregunta:
        return Response({"error": "No se proporcionó una pregunta."}, status=400)

    # Generar el embedding de la pregunta
    pregunta_embedding = embedding_model.encode(pregunta)

    # Calcular la similitud coseno
    similitudes = np.dot(embeddings, pregunta_embedding) / (
        np.linalg.norm(embeddings, axis=1) * np.linalg.norm(pregunta_embedding)
    )

    # Encontrar el texto más similar
    indice_respuesta = np.argmax(similitudes)
    contexto = textos[indice_respuesta]

    # Verificar si la similitud es suficientemente alta
    umbral_similitud = 0.3  # Ajusta este valor según sea necesario
    if similitudes[indice_respuesta] < umbral_similitud:
        return Response({
            "respuesta": "Lo siento, no puedo responder a esa pregunta porque está fuera del contexto de la Ley de Telecomunicaciones."
        })

    # Crear el prompt para Ollama
    prompt = f"""
    Contexto: {contexto}
    Pregunta: {pregunta}
    Responde en español de manera educada y amable:
    """

    # Enviar el prompt a Ollama
    try:
        response = requests.post(OLLAMA_API_URL, json={
            "model": "tinyllama",  # Cambia esto si tu modelo tiene otro nombre en Ollama
            "prompt": prompt
        })
        response.raise_for_status()
        respuesta = response.json().get("response", "Lo siento, no pude generar una respuesta.")
    except requests.RequestException as e:
        return Response({
            "respuesta": "Lo siento, no pude procesar tu pregunta en este momento. Por favor, intenta nuevamente más tarde."
        }, status=500)

    return Response({"respuesta": respuesta})
