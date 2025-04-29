import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Noticias UPEC - Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
