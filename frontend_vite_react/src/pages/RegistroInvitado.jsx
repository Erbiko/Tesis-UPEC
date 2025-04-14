import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../auth/useAuth";

const RegistroInvitado = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("usuarios/registro/", formData);
      const { token, usuario } = response.data;
      login(token, usuario); // Guardamos el token en contexto y localStorage
      navigate("/"); // Redirige al inicio
    } catch (err) {
      console.error(err);
      setError("Error al registrarse. Intenta con otro nombre de usuario o correo.");
    }
  };

  return (
    <div className="registro-invitado">
      <h2>Registro de Invitado</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegistroInvitado;
