import { useEffect, useState, useContext } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./MisNoticias.css";

const MisNoticias = () => {
  const { usuario } = useContext(AuthContext);
  const [noticias, setNoticias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMisNoticias = async () => {
      try {
        const res = await api.get("noticias/mis/");
        setNoticias(res.data);
      } catch (err) {
        console.error("Error al cargar tus noticias:", err);
      }
    };

    fetchMisNoticias();
  }, []);

  const eliminarNoticia = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) return;

    try {
      console.log("Intentando eliminar noticia con ID:", id); // Verifica el ID
      await api.delete(`noticias/mis/${id}/`);
      setNoticias(noticias.filter((noticia) => noticia.id !== id));
    } catch (error) {
      console.error("Error al eliminar la noticia:", error.response?.data || error);
      alert(
        error.response?.data?.detail ||
          "No se pudo eliminar la noticia. Verifica su estado o permisos."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-6"
        onClick={() => navigate("/crear-noticia")}
      >
        ➕ Crear nueva noticia
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mis Noticias</h2>

      {noticias.length === 0 ? (
        <p className="text-gray-500">No has creado noticias aún.</p>
      ) : (
      <ul className="space-y-4">
        {noticias.map((noticia) => (
          <li key={noticia.id} className="bg-white p-4 rounded shadow-md">
            <strong className="text-lg">{noticia.titulo}</strong> <br />
            <p className={`text-sm font-semibold ${
              noticia.estado === "modificada"
                ? "text-blue-500"
                : noticia.estado === "pendiente"
                ? "text-gray-500"
                : noticia.estado === "aprobada"
                ? "text-green-500"
                : "text-red-500"
            }`}>
              {noticia.estado === "modificada"
                ? "Modificada / Pendiente"
                : noticia.estado === "pendiente"
                ? "Pendiente"
                : noticia.estado === "aprobada"
                ? "Aprobada"
                : "Rechazada"}
            </p>
            {noticia.estado === "rechazada" && noticia.justificacion_rechazo && (
              <p className="text-red-500 mt-2">
                <strong>Motivo del rechazo:</strong> {noticia.justificacion_rechazo}
              </p>
            )}
            <div className="mt-2 space-x-2">
              {noticia.estado !== "aprobada" && (
                <>
                  <Link
                    to={`/editar-noticia/${noticia.id}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={() => eliminarNoticia(noticia.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑️ Eliminar
                  </button>

                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      )}
    </div>
  );
};

export default MisNoticias;

