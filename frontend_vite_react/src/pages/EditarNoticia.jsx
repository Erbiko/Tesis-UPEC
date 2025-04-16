import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const EditarNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    resumen: "",
    contenido: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`noticias/${id}/`)
      .then((res) => {
        setFormData({
          titulo: res.data.titulo,
          resumen: res.data.resumen,
          contenido: res.data.contenido,
        });
      })
      .catch((err) => {
        setError("No se pudo cargar la noticia");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`noticias/${id}/`, formData);
      navigate("/mis-noticias");
    } catch (err) {
      setError("Error al actualizar la noticia.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Editar Noticia</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="resumen"
          value={formData.resumen}
          onChange={handleChange}
          required
        />
        <textarea
          name="contenido"
          value={formData.contenido}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarNoticia;
