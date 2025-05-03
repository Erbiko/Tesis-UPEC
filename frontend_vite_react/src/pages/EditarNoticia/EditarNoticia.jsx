import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/axios";
import "./EditarNoticia.css";

const EditarNoticia = () => {
  const { id } = useParams(); // Obtiene el ID de la noticia desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    imagen_actual: "",
    imagen: null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        console.log("Cargando noticia con ID:", id); // Verifica el ID
        const res = await api.get(`noticias/mis/${id}/`) // Solicitud al backend
        setFormData({
          titulo: res.data.titulo,
          contenido: res.data.contenido,
          imagen_actual: res.data.imagen,
          imagen: null,
        });
      } catch (err) {
        setError("No se pudo cargar la noticia. Verifica que tienes acceso.");
        console.error(err.response?.data || err);
      }
    };

    fetchNoticia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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
      await api.patch(`noticias/mis/${id}/`, datos, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/mis-noticias");
    } catch (err) {
      setError("Error al actualizar la noticia.");
      console.error(err.response?.data || err);
    }
    const eliminarNoticia = async (id) => {
      if (!window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) return;
    
      try {
        await api.delete(`noticias/mis/${id}/`);
        alert("Noticia eliminada exitosamente.");
        navigate("/mis-noticias");
      } catch (error) {
        console.error("Error al eliminar la noticia:", error.response?.data || error.message);
        alert("Ocurrió un error al eliminar la noticia.");
      }
    };
    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Editar Noticia</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="contenido"
          value={formData.contenido}
          onChange={handleChange}
          placeholder="Contenido"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {formData.imagen_actual && (
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Imagen actual:</p>
            <img
              src={formData.imagen_actual}
              alt="Imagen actual"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarNoticia;
