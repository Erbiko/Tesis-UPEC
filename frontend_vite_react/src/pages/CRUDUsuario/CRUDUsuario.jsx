// pages/CRUDUsuario.jsx
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import "./CRUDUsuario.css";

const CRUDUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    email: "",
    rol: "invitado",
    password: "",
    confirmPassword: "",
  });

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
      await api.delete(`usuarios/${id}/eliminar/`);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  const editarUsuario = async (usuario) => {
    try {
      await api.put(`usuarios/${usuario.id}/`, usuario);
      fetchUsuarios();
      setModalVisible(false);
    } catch (err) {
      console.error("Error al editar usuario", err);
    }
  };

  const crearUsuario = async () => {
    if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await api.post("usuarios/crear/", {
        username: nuevoUsuario.username,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        password: nuevoUsuario.password,
      });
      fetchUsuarios();
      setNuevoUsuario({ username: "", email: "", rol: "invitado", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error al crear usuario", err);
    }
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para crear usuario */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Crear Nuevo Usuario</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearUsuario();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre de usuario:</label>
            <input
              type="text"
              value={nuevoUsuario.username}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              value={nuevoUsuario.email}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rol:</label>
            <select
              value={nuevoUsuario.rol}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Administrador</option>
              <option value="periodista">Periodista</option>
              <option value="invitado">Invitado</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contraseña:</label>
            <input
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirmar Contraseña:</label>
            <input
              type="password"
              value={nuevoUsuario.confirmPassword}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, confirmPassword: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Crear Usuario
          </button>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombre de usuario</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">{usuario.id}</td>
              <td className="p-3">{usuario.username}</td>
              <td className="p-3">{usuario.email}</td>
              <td className="p-3">
                {usuario.is_staff
                  ? "Administrador"
                  : usuario.es_periodista
                  ? "Periodista"
                  : "Invitado"}
              </td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => abrirModalEdicion(usuario)}
                  className="bg-yellow-500 text-white font-semibold py-1 px-3 rounded hover:bg-yellow-600 transition duration-300"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarUsuario(usuario.id)}
                  className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Editar Usuario</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editarUsuario(usuarioSeleccionado);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nombre de usuario:</label>
                <input
                  type="text"
                  value={usuarioSeleccionado.username}
                  onChange={(e) =>
                    setUsuarioSeleccionado({ ...usuarioSeleccionado, username: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email:</label>
                <input
                  type="email"
                  value={usuarioSeleccionado.email}
                  onChange={(e) =>
                    setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Rol:</label>
                <select
                  value={
                    usuarioSeleccionado.is_staff
                      ? "admin"
                      : usuarioSeleccionado.es_periodista
                      ? "periodista"
                      : "invitado"
                  }
                  onChange={(e) => {
                    const rol = e.target.value;
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      is_staff: rol === "admin",
                      es_periodista: rol === "periodista",
                      rol: rol,
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Administrador</option>
                  <option value="periodista">Periodista</option>
                  <option value="invitado">Invitado</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nueva Contraseña:</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setUsuarioSeleccionado({ ...usuarioSeleccionado, password: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDUsuario;
