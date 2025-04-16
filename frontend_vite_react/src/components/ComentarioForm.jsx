import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { api } from "../api/axios"; // usa tu instancia configurada

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
    <form onSubmit={handleSubmit}>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu comentario..."
        required
      />
      <button type="submit">Comentar</button>
    </form>
  );
};

export default ComentarioForm;
    