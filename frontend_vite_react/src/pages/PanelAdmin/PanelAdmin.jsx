import { Link } from "react-router-dom";

const PanelAdmin = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <ul>
        <li><Link to="/admin/aprobaciones">📜 Noticias pendientes</Link></li>
        <li><Link to="/admin/usuarios">👥 Gestión de usuarios</Link></li>
      </ul>
    </div>
  );
};

export default PanelAdmin;
