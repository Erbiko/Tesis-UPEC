import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";

const NoticiaDetalle = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);

    useEffect(() => {
        api.get(`noticias/${id}/`)
            .then((response) => {
                setNoticia(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener la noticia:", error);
            });
    }, [id]);

    if (!noticia) return <p>Cargando noticia...</p>;

    return (
        <div>
            <h1>{noticia.titulo}</h1>
            <p>{noticia.contenido}</p>
            {noticia.imagen && <img src={noticia.imagen} alt="Imagen de la noticia" />}
        </div>
    );
};

export default NoticiaDetalle;
