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

  if (!noticia)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        Cargando noticia...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      {noticia.imagen && (
        <img
          src={noticia.imagen}
          alt="Imagen de la noticia"
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />
      )}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{noticia.titulo}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {noticia.contenido}
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Comentarios
        </h2>
        <ComentarioForm
          noticiaId={noticia.id}
          onComentarioPublicado={setNuevoComentario}
        />
        <ComentarioList
          noticiaId={noticia.id}
          nuevoComentario={nuevoComentario}
        />
      </div>
    </div>
  );
};

export default NoticiaDetalle;
