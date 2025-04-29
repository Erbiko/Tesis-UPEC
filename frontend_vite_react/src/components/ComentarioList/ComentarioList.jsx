import { useEffect, useState, useContext } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../auth/AuthContext";
import "./ComentarioList.css";

const ComentarioList = ({ noticiaId, nuevoComentario }) => {
  const [comentarios, setComentarios] = useState([]);
  const { usuario } = useContext(AuthContext);

  const cargarComentarios = async () => {
    try {
      const response = await api.get("comentarios/");
      const todos = response.data;
      const filtrados = todos.filter((comentario) => comentario.noticia === noticiaId);
      setComentarios(filtrados);
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    }
  };

  const eliminarComentario = async (id) => {
    try {
      await api.delete(`comentarios/${id}/`);
      setComentarios(comentarios.filter((comentario) => comentario.id !== id));
    } catch (error) {
      console.error("No se pudo eliminar el comentario:", error.response?.data || error);
    }
  };

  useEffect(() => {
    cargarComentarios();
  }, [noticiaId]);

  useEffect(() => {
    if (nuevoComentario) {
      setComentarios((prev) => [nuevoComentario, ...prev]);
    }
  }, [nuevoComentario]);

  return (
    <div className="comentario-list">
      <h3>Comentarios</h3>
      {comentarios.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <strong>{comentario.usuario}</strong>: {comentario.contenido}
              {usuario && comentario.usuario === usuario && (
                <button onClick={() => eliminarComentario(comentario.id)}>
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComentarioList;
