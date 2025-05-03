import React, { useState, useEffect } from "react";
import { api } from "../../api/axios";
import "./NoticiasPage.css";

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await api.get("/noticias/"); // Endpoint para noticias aprobadas
        setNoticias(res.data);
      } catch (err) {
        console.error("Error al cargar noticias:", err);
        setError("No se pudieron cargar las noticias. Intenta nuevamente.");
      }
    };

    fetchNoticias();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (noticias.length === 0) return <p className="text-gray-500 text-center mt-10">No hay noticias disponibles.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Noticias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {noticia.titulo}
              </h3>
              <p className="text-gray-600 mb-4">
                {noticia.contenido.slice(0, 150)}...
              </p>
              <a
                href={`/noticia/${noticia.id}`}
                className="text-blue-500 hover:underline"
              >
                Leer más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticiasPage;
