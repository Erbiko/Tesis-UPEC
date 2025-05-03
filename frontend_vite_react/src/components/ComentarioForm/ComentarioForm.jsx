import { useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { api } from "../../api/axios"; // usa tu instancia configurada
import "./ComentarioForm.css";

const ComentarioForm = ({ noticiaId, onComentarioPublicado }) => {
  const { usuario } = useContext(AuthContext);
  const [texto, setTexto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    try {
      const { data } = await api.post("comentarios/", {
        noticia: noticiaId,
        contenido: texto,
      });

      setTexto("");
      onComentarioPublicado(data);
    } catch (error) {
      console.error("Error al publicar comentario:", error.response?.data || error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu comentario..."
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Comentar
      </button>
    </form>
  );
};

export default ComentarioForm;
