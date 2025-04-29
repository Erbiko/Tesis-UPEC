import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import "./EditarNoticia.css";

const EditarNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    imagen_actual: "",
    imagen: null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`noticias/${id}/`)
      .then((res) => {
        setFormData({
          titulo: res.data.titulo,
          contenido: res.data.contenido,
          imagen_actual: res.data.imagen,
          imagen: null,
        });
      })
      .catch((err) => {
        setError("No se pudo cargar la noticia");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = new FormData();
    datos.append("titulo", formData.titulo);
    datos.append("contenido", formData.contenido);
    if (formData.imagen) {
      datos.append("imagen", formData.imagen);
    }

    try {
      await api.put(`noticias/${id}/`, datos, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/mis-noticias");
    } catch (err) {
      setError("Error al actualizar la noticia.");
      console.error(err);
    }
  };

  return (
    <div className="editar-noticia">
      <h2>Editar Noticia</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />

        <textarea
          name="contenido"
          value={formData.contenido}
          onChange={handleChange}
          placeholder="Contenido"
          required
        />

        {formData.imagen_actual && (
          <div className="imagen-actual">
            <p>Imagen actual:</p>
            <img src={formData.imagen_actual} alt="Imagen actual" />
          </div>
        )}

        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleChange}
        />

        {error && <p>{error}</p>}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarNoticia;
