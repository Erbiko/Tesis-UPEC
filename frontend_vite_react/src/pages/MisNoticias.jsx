import { useEffect, useState, useContext } from "react";
import { api } from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const MisNoticias = () => {
  const { usuario } = useContext(AuthContext);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchMisNoticias = async () => {
      try {
        const res = await api.get("noticias/");  // El backend filtra por periodista
        setNoticias(res.data);
      } catch (err) {
        console.error("Error al cargar tus noticias:", err);
      }
    };

    fetchMisNoticias();
  }, []);

  return (
    <div>
      <h2>Mis Noticias</h2>
      {noticias.length === 0 ? (
        <p>No has creado noticias aún.</p>
      ) : (
        <ul>
          {noticias.map((noticia) => (
            <li key={noticia.id}>
              <strong>{noticia.titulo}</strong> - Estado: {noticia.aprobado ? "Aprobada" : "Pendiente"}  
              <br />
              <Link to={`/editar-noticia/${noticia.id}`}>✏️ Editar</Link>
              {" | "}
              <button onClick={() => eliminarNoticia(noticia.id)}>🗑️ Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const eliminarNoticia = async (id) => {
  try {
    await api.delete(`noticias/${id}/`);
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar la noticia:", error);
  }
};

export default MisNoticias;
