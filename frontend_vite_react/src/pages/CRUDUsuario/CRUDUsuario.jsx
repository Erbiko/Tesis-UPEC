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
    <div className="container">
      <h2>Gestión de Usuarios</h2>
      {error && <p className="error">{error}</p>}

      <div>
        <h3>Crear Nuevo Usuario</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearUsuario();
          }}
        >
          <label>
            Nombre de usuario:
            <input
              type="text"
              value={nuevoUsuario.username}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={nuevoUsuario.email}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
              required
            />
          </label>
          <label>
            Rol:
            <select
              value={nuevoUsuario.rol}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
            >
              <option value="admin">Administrador</option>
              <option value="periodista">Periodista</option>
              <option value="invitado">Invitado</option>
            </select>
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
              required
            />
          </label>
          <label>
            Confirmar Contraseña:
            <input
              type="password"
              value={nuevoUsuario.confirmPassword}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, confirmPassword: e.target.value })}
              required
            />
          </label>
          <button type="submit">Crear Usuario</button>
        </form>
      </div>

      <table>
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
                <button onClick={() => abrirModalEdicion(usuario)}>✏️ Editar</button>
                <button onClick={() => eliminarUsuario(usuario.id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <h3>Editar Usuario</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editarUsuario(usuarioSeleccionado);
            }}
          >
            <label>
              Nombre de usuario:
              <input
                type="text"
                value={usuarioSeleccionado.username}
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, username: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={usuarioSeleccionado.email}
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })
                }
              />
            </label>
            <label>
              Rol:
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
              >
                <option value="admin">Administrador</option>
                <option value="periodista">Periodista</option>
                <option value="invitado">Invitado</option>
              </select>
            </label>
            <label>
              Nueva Contraseña:
              <input
                type="password"
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, password: e.target.value })
                }
              />
            </label>
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setModalVisible(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CRUDUsuario;
