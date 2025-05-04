from sentence_transformers import SentenceTransformer
from PyPDF2 import PdfReader
import json
import os

# Cargar el modelo de embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# Obtener la ruta absoluta del archivo PDF
pdf_path = os.path.join(os.path.dirname(__file__), "Ley-162-de-comunicacion-social-2023.pdf")

# Leer el texto del PDF
reader = PdfReader(pdf_path)
secciones = [page.extract_text() for page in reader.pages]

# Dividir el texto en fragmentos más pequeños (por párrafos)
fragmentos = []
for seccion in secciones:
    fragmentos.extend(seccion.split("\n\n"))
    # Combinar fragmentos pequeños
    if len(fragmentos) > 1 and len(fragmentos[-1]) < 100:
        fragmentos[-2] += " " + fragmentos.pop()

# Generar embeddings
embeddings = []
for fragmento in fragmentos:
    if fragmento.strip():  # Ignorar fragmentos vacíos
        vector = model.encode(fragmento)
        embeddings.append({"texto": fragmento, "embedding": vector.tolist()})

# Guardar los embeddings en un archivo JSON
output_path = os.path.join(os.path.dirname(__file__), "embeddings.json")
with open(output_path, "w", encoding="utf-8") as file:
    json.dump(embeddings, file)

print("Embeddings generados y guardados en 'embeddings.json'.")