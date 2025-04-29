import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import LogoutButton from "../LogoutButton";
import "./Navbar.css";

const Navbar = () => {
  const { usuario, rol } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar__logo">UPEC</h1>
      <ul className="navbar__list">
        <li><Link to="/" className="navbar__link">Inicio</Link></li>

        {rol === "admin" ? (
          <>
            <li><Link to="/admin/aprobaciones" className="navbar__link">📝 Moderar Noticias</Link></li>
            <li><Link to="/admin/usuarios" className="navbar__link">👥 Usuarios</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/noticias" className="navbar__link">Noticias</Link></li>
            {rol === "periodista" && (
              <li><Link to="/mis-noticias" className="navbar__link">Mis Noticias</Link></li>
            )}
          </>
        )}

        {usuario ? (
          <>
            <li className="navbar__link">Hola, {usuario}</li>
            <li><LogoutButton className="navbar__button" /></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="navbar__link">Iniciar sesión</Link></li>
            <li><Link to="/registro" className="navbar__link">Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
