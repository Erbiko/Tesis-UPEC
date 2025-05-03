import React from 'react';
import { useAuth } from '../auth/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // 🔥 Redirige y refresca al cerrar sesión
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
