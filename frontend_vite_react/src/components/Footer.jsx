import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Noticias UPEC - Todos los derechos reservados</p>
    </footer>
  );
};

const styles = {
  footer: { textAlign: "center", padding: "1rem", background: "#333", color: "white", marginTop: "2rem" }
};

export default Footer;
