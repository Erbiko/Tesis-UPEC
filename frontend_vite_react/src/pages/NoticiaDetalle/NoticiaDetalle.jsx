import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios";
import ComentarioForm from "../../components/ComentarioForm/ComentarioForm";
import ComentarioList from "../../components/ComentarioList/ComentarioList";

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState(null);

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
      
      <ComentarioForm noticiaId={noticia.id} onComentarioPublicado={setNuevoComentario} />
      <ComentarioList noticiaId={noticia.id} nuevoComentario={nuevoComentario} />
    </div>
  );
};

export default NoticiaDetalle;
