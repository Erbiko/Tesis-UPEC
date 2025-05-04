import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import "./Home.css";

const Home = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await api.get("/noticias/");
        setNoticias(res.data);
      } catch (err) {
        console.error("Error al cargar noticias:", err);
        setError("No se pudieron cargar las noticias. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando noticias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Noticias</h1>
      
      {/* Botón para acceder al Chatbot */}
      <div className="text-center mb-6">
        <Link
          to="/chatbot"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Ir al Chatbot
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(noticias) && noticias.length > 0 ? (
          noticias.map((noticia) => (
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
                <Link
                  to={`/noticia/${noticia.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Leer más
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No hay noticias disponibles por el momento.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
