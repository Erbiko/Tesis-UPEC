import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { usuario, rol, logout } = useAuth(); // ⬅️ Ahora sacamos el rol directamente

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>UPEC</h1>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>

        {rol === "admin" ? (
          <>
            <li><Link to="/admin/aprobaciones" style={styles.link}>📝 Moderar Noticias</Link></li>
            <li><Link to="/admin/usuarios" style={styles.link}>👥 Usuarios</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/noticias" style={styles.link}>Noticias</Link></li>
            {rol === "periodista" && (
              <li><Link to="/mis-noticias" style={styles.link}>Mis Noticias</Link></li>
            )}
          </>
        )}

        {usuario ? (
          <>
            <li style={styles.link}>Hola, {usuario}</li>
            <li><LogoutButton style={styles.link} /></li>
          </>
        ) : (
          <>
            <li><Link to="/login" style={styles.link}>Iniciar sesión</Link></li>
            <li><Link to="/registro" style={styles.link}>Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#333",
    color: "white",
  },
  logo: { margin: "0", fontSize: "1.5rem" },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: "0",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.1rem",
    background: "none",
    border: "none",
    cursor: "pointer"
  }
};

export default Navbar;
