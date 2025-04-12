import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import ComentarioForm from "../components/ComentarioForm";

const NoticiaDetalle = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        api.get(`noticias/${id}/`)
            .then((response) => {
                setNoticia(response.data);
                setComentarios(response.data.comentarios || []);
            })
            .catch((error) => {
                console.error("Error al obtener la noticia:", error);
            });
    }, [id]);

    // Función para actualizar la lista de comentarios después de agregar uno nuevo
    const handleNuevoComentario = (nuevoComentario) => {
        setComentarios([...comentarios, nuevoComentario]);
    };

    if (!noticia) return <p>Cargando noticia...</p>;

    return (
        <div>
            <h1>{noticia.titulo}</h1>
            <p>{noticia.contenido}</p>
            {noticia.imagen && <img src={noticia.imagen} alt="Imagen de la noticia" />}

            <h2>Comentarios</h2>
            <ComentarioForm noticiaId={id} onComentarioPublicado={handleNuevoComentario} />

            <ul>
                {comentarios.length > 0 ? (
                    comentarios.map((com) => (
                        <li key={com.id}>
                            <strong>{com.usuario.nombre}:</strong> {com.texto}
                        </li>
                    ))
                ) : (
                    <p>Aún no hay comentarios. Sé el primero en comentar.</p>
                )}
            </ul>
        </div>
    );
};

export default NoticiaDetalle;
