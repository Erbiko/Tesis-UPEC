// pages/CRUDUsuario.jsx
import { useEffect, useState } from "react";
import { api } from "../api/axios";

const CRUDUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("usuarios/");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
      setError("No se pudieron cargar los usuarios");
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    try {
      await api.delete(`usuarios/${id}/`);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Gestín de Usuarios</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>
                {usuario.is_staff
                  ? "Administrador"
                  : usuario.es_periodista
                  ? "Periodista"
                  : "Invitado"}
              </td>
              <td>
                <button onClick={() => eliminarUsuario(usuario.id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUDUsuario;
