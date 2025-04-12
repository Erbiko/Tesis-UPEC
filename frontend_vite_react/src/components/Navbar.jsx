import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}> UPEC</h1>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/noticias" style={styles.link}>Noticias</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: { display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "white" },
  logo: { margin: "0", fontSize: "1.5rem" },
  navList: { listStyle: "none", display: "flex", gap: "1rem", margin: "0" },
  link: { textDecoration: "none", color: "white", fontSize: "1.2rem" }
};

export default Navbar;
