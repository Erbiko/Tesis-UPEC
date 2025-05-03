import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { api } from "../../api/axios";
import "./CrearNoticia.css";

const CrearNoticia = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    imagen: null,
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
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/mis-noticias");
    } catch (err) {
      console.error("Error al crear la noticia:", err.response?.data || err.message);
      setError("No se pudo crear la noticia.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Crear Noticia</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="contenido"
          placeholder="Contenido"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CrearNoticia;
