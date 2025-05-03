import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { Link } from "react-router-dom";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    api.get("noticias/")
      .then((response) => {
        setNoticias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener noticias:", error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Noticias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {noticia.titulo}
              </h2>
              <p className="text-gray-600 mb-4">
                {noticia.contenido.slice(0, 100)}...
              </p>
              <Link
                to={`/noticia/${noticia.id}`}
                className="text-blue-500 hover:underline"
              >
                Leer más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
