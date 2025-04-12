import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

const Home = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/noticias/")
            .then((response) => {
                setNoticias(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener las noticias:", error);
                setError("Hubo un problema al cargar las noticias.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-container">
            <h1>Últimas Noticias de la UPEC</h1>
            <p>Mantente informado con las últimas noticias verificadas.</p>

            {loading && <p>Cargando noticias...</p>}
            {error && <p className="error">{error}</p>}

            <div className="noticias-container">
                {noticias.map((noticia) => (
                    <div key={noticia.id} className="noticia">
                        <h3>{noticia.titulo}</h3>
                        <p>{noticia.resumen}</p>
                        <Link to={`/noticia/${noticia.id}`}>Leer más</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
