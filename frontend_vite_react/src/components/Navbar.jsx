import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    // Obtenemos el rol desde el localStorage cuando el componente carga
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
  }, [usuario]); // cada vez que cambia el usuario, actualiza el rol

  const handleLogout = () => {
    logout();
    localStorage.removeItem("rol");
    setRol(null);
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

            {/* Solo si es periodista, muestra sección personalizada */}
            {rol === "periodista" && (
              <li><Link to="/mis-noticias" style={styles.link}>Mis Noticias</Link></li>
            )}

            <li>
              <LogoutButton style={styles.link} />  
            </li>
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
