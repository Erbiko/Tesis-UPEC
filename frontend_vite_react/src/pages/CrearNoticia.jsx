import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { api } from "../api/axios";

const CrearNoticia = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    resumen: "",
    contenido: "",
    imagen: null
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) {
      alert("No tienes autorizacion para hacer eso.");
      return;
    }

    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("resumen", formData.resumen);
    data.append("contenido", formData.contenido);
    if (formData.imagen) data.append("imagen", formData.imagen);

    try {
      await api.post("noticias/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/noticias");
    } catch (err) {
      console.error("Error al crear la noticia:", err.response?.data || err.message);
      setError("No se pudo crear la noticia.");
    }
  };

  return (
    <div>
      <h2>Crear Noticia</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" onChange={handleChange} required />
        <input type="text" name="resumen" placeholder="Resumen" onChange={handleChange} required />
        <textarea name="contenido" placeholder="Contenido" onChange={handleChange} required />
        <input type="file" name="imagen" onChange={handleChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CrearNoticia;
