import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import LogoutButton from "../LogoutButton";

const Navbar = () => {
  const { usuario, rol } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">UPEC</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">Inicio</Link>
        </li>

        {rol === "admin" ? (
          <>
            <li>
              <Link to="/admin/aprobaciones" className="hover:text-gray-300">
                📝 Moderar Noticias
              </Link>
            </li>
            <li>
              <Link to="/admin/usuarios" className="hover:text-gray-300">
                👥 Usuarios
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/noticias" className="hover:text-gray-300">Noticias</Link>
            </li>
            {rol === "periodista" && (
              <li>
                <Link to="/mis-noticias" className="hover:text-gray-300">
                  Mis Noticias
                </Link>
              </li>
            )}
          </>
        )}

        {usuario ? (
          <>
            <li className="font-semibold">Hola, {usuario}</li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-gray-300">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/registro" className="hover:text-gray-300">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
