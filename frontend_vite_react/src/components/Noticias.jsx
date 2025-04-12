import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        api.get("noticias/")
            .then((response) => {
                setNoticias(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener noticias:", error);
            });
    }, []);

    return (
        <div>
            <h1>Noticias</h1>
            {noticias.map((noticia) => (
                <div key={noticia.id}>
                    <h2>{noticia.titulo}</h2>
                    <p>{noticia.contenido.slice(0, 100)}...</p>
                    <Link to={`/noticia/${noticia.id}`}>Leer más</Link>
                </div>
            ))}
        </div>
    );
};

export default Noticias;
