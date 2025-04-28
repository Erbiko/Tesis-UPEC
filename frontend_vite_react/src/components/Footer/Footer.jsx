import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Noticias UPEC - Todos los derechos reservados</p>
    </footer>
  );
};

const styles = {
  footer: { textAlign: "center", padding: "1rem", background: "#333", color: "white", marginTop: "2rem" }
};

export default Footer;
