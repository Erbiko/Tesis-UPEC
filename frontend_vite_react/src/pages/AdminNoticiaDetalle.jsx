import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

const AdminNoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`noticias/${id}/`)
      .then((response) => {
        setNoticia(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la noticia:", error);
        setError("No se pudo cargar la noticia.");
      });
  }, [id]);

  const aprobarNoticia = async () => {
    try {
      await api.put(`noticias/${id}/aprobar/`);
      alert("Noticia aprobada exitosamente.");
      navigate("/admin/aprobaciones");
    } catch (err) {
      console.error("Error al aprobar la noticia:", err.response?.data || err);
      alert("No se pudo aprobar la noticia. Verifica que tienes permisos y que el servidor está configurado correctamente.");
    }
  };

  const rechazarNoticia = async () => {
    const justificacion = prompt("Por favor, ingrese la justificación para rechazar esta noticia:");
    if (!justificacion) {
      alert("Debe proporcionar una justificación para rechazar la noticia.");
      return;
    }

    try {
      await api.put(`noticias/${id}/rechazar/`, { justificacion_rechazo: justificacion });
      alert("Noticia rechazada exitosamente.");
      navigate("/admin/aprobaciones");
    } catch (err) {
      console.error("Error al rechazar la noticia:", err.response?.data || err);
      alert("No se pudo rechazar la noticia. Verifica que tienes permisos y que el servidor está configurado correctamente.");
    }
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!noticia) return <p className="text-gray-500 text-center mt-10">Cargando noticia...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{noticia.titulo}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{noticia.contenido}</p>
      {noticia.imagen && (
        <img
          src={noticia.imagen}
          alt="Imagen de la noticia"
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />
      )}
      <div className="flex space-x-4">
        <button
          onClick={aprobarNoticia}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          ✅ Aprobar
        </button>
        <button
          onClick={rechazarNoticia}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          ❌ Rechazar
        </button>
      </div>
    </div>
  );
};

export default AdminNoticiaDetalle;