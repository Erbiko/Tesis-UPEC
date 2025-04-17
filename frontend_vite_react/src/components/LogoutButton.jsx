import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const LogoutButton = ({ style }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirige tras cerrar sesión
  };

  return (
    <button onClick={handleLogout} style={style}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
