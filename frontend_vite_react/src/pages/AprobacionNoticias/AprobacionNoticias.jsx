// pages/AprobacionNoticias.jsx
import React, { useState, useEffect } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./AprobacionNoticias.css";

const AprobacionNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendientes = async () => {
      try {
        const res = await api.get("noticias/pendientes/");
        setNoticias(res.data);
      } catch (err) {
        console.error("Error al cargar noticias pendientes:", err);
        setError("No se pudieron cargar las noticias pendientes.");
      }
    };

    fetchPendientes();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (noticias.length === 0) return <p className="text-gray-500 text-center mt-10">No hay noticias pendientes.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Noticias Pendientes de Moderación</h2>
      <ul className="space-y-4">
        {noticias.map((noticia) => (
          <li
            key={noticia.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h4 className="text-xl font-semibold text-gray-800">{noticia.titulo}</h4>
            <p className="text-gray-600 mb-4">{noticia.contenido.slice(0, 100)}...</p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/admin/noticia/${noticia.id}`)}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                📄 Ver Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AprobacionNoticias;
