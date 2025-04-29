import React from 'react';
import { useAuth } from '../auth/useAuth';
import "./LogoutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // 🔥 Redirige y refresca al cerrar sesión
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
