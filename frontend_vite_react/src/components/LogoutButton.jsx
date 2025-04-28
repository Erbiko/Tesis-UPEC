import React from 'react';
import { useAuth } from '../auth/useAuth';


const LogoutButton = ({ style }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";  // 🔥 Redirige y refresca al cerrar sesión
  };

  return (
    <button onClick={handleLogout} style={style}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
