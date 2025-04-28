// pages/AprobacionNoticias.jsx
import { useEffect, useState } from "react";
import { api } from "../../api/axios";

const AprobacionNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);

  const fetchPendientes = async () => {
    try {
      const res = await api.get("noticias/pendientes/");
      setNoticias(res.data);
    } catch (err) {
      console.error("Error al cargar noticias pendientes", err);
      setError("No se pudieron cargar las noticias pendientes.");
    }
  };

  const aprobarNoticia = async (id) => {
    try {
      await api.put(`noticias/${id}/aprobar/`);
      fetchPendientes();
    } catch (err) {
      console.error("Error al aprobar noticia", err);
    }
  };

  const rechazarNoticia = async (id) => {
    if (!window.confirm("Esta acción eliminará la noticia. ¿Continuar?")) return;
    try {
      await api.put(`noticias/${id}/rechazar/`);
      fetchPendientes();
    } catch (err) {
      console.error("Error al rechazar noticia", err);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  return (
    <div>
      <h2>Noticias Pendientes de Aprobación</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {noticias.length === 0 ? (
        <p>No hay noticias pendientes.</p>
      ) : (
        <ul>
          {noticias.map((noticia) => (
            <li key={noticia.id} style={{ marginBottom: "1.5rem" }}>
              <h4>{noticia.titulo}</h4>
              <p><strong>Estado:</strong> {noticia.estado}</p>
              <p>{noticia.contenido.slice(0, 100)}...</p>
              <button onClick={() => aprobarNoticia(noticia.id)}>✅ Aprobar</button>
              <button onClick={() => rechazarNoticia(noticia.id)}>❌ Rechazar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AprobacionNoticias;
