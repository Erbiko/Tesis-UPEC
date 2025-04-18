import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { api } from "../api/axios";

const CrearNoticia = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
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
      alert("Debes iniciar sesión para publicar.");
      return;
    }

    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("contenido", formData.contenido);
    if (formData.imagen) data.append("imagen", formData.imagen);

    try {
      await api.post("noticias/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/mis-noticias");
    } catch (err) {
      console.error("Error al crear la noticia:", err.response?.data || err.message);
      setError("No se pudo crear la noticia.");
    }
  };

  return (
    <div>
      <h2>Crear Noticia</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="titulo" placeholder="Título" onChange={handleChange} required />
        <textarea name="contenido" placeholder="Contenido" onChange={handleChange} required />
        <input type="file" name="imagen" onChange={handleChange} accept="image/*" />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CrearNoticia;
