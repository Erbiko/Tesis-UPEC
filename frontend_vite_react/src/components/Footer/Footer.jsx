import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Noticias UPEC - Todos los derechos reservados
      </p>
    </footer>
  );
};

export default Footer;
