import React, { useState, useEffect } from "react";
import axios from "axios";

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    // Aquí obtendrás las noticias desde el backend
    axios.get("http://localhost:8000/api/noticias/")
      .then(response => {
        setNoticias(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las noticias: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Noticias</h1>
      <div>
        {noticias.length === 0 ? (
          <p>No hay noticias disponibles por el momento.</p>
        ) : (
          noticias.map((noticia) => (
            <div key={noticia.id} style={styles.noticia}>
              <h3>{noticia.titulo}</h3>
              <p>{noticia.contenido}</p>
              <img src={noticia.imagen} alt={noticia.titulo} style={styles.imagen} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  noticia: { marginBottom: "2rem" },
  imagen: { width: "100%", maxHeight: "300px", objectFit: "cover" },
};

export default NoticiasPage;
