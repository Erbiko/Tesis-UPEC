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
      await api.delete(`noticias/${id}/`);
      setNoticias(noticias.filter((noticia) => noticia.id !== id));
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
    }
  };

  return (
    <div className="mis-noticias">
      <button
        className="crear-noticia-btn"
        onClick={() => navigate("/crear-noticia")}
      >
        ➕ Crear nueva noticia
      </button>

      <h2>Mis Noticias</h2>

      {noticias.length === 0 ? (
        <p>No has creado noticias aún.</p>
      ) : (
        <ul>
          {noticias.map((noticia) => (
            <li key={noticia.id}>
              <strong>{noticia.titulo}</strong> - Estado:{" "}
              {noticia.aprobado ? "Aprobada" : "Pendiente"}
              <br />
              <Link to={`/editar-noticia/${noticia.id}`}>✏️ Editar</Link>
              <button onClick={() => eliminarNoticia(noticia.id)}>🗑️ Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisNoticias;

