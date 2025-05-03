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
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comentarios</h3>
      {comentarios.length === 0 ? (
        <p className="text-gray-500">No hay comentarios aún.</p>
      ) : (
        <ul className="space-y-4">
          {comentarios.map((comentario) => (
            <li
              key={comentario.id}
              className="border-b border-gray-200 pb-4 flex justify-between items-center"
            >
              <div>
                <strong className="text-gray-800">{comentario.usuario}</strong>
                <p className="text-gray-600">{comentario.contenido}</p>
              </div>
              {usuario && comentario.usuario === usuario && (
                <button
                  onClick={() => eliminarComentario(comentario.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
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
