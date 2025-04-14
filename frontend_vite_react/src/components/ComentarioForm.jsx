

import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

const ComentarioForm = ({ noticiaId, onComentarioPublicado }) => {
    const { user } = useContext(AuthContext);
    const [texto, setTexto] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }

        try {
            const { data } = await axios.post(`http://127.0.0.1:8000/api/comentarios/`, {
                noticia: noticiaId,
                usuario: user.id,
                texto,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setTexto("");  // Limpiar el formulario
            onComentarioPublicado(data);  // Actualizar la lista de comentarios
        } catch (error) {
            console.error("Error al publicar comentario", error);
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
