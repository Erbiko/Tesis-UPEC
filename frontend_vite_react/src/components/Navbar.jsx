import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const esPeriodista = localStorage.getItem("rol") === "periodista";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("rol"); // limpiamos el rol también
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>UPEC</h1>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/noticias" style={styles.link}>Noticias</Link></li>

        {usuario ? (
          <>
            <li style={styles.link}>Hola, {usuario}</li>
            {esPeriodista && (
              <li><Link to="/mis-noticias" style={styles.link}>Mis Noticias</Link></li>
            )}
            <li><button onClick={handleLogout} style={styles.link}>Cerrar sesión</button></li>
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
