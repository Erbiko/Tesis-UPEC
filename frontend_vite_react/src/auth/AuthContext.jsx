// auth/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));

  const login = (nuevoToken, nuevoUsuario) => {
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('usuario', nuevoUsuario);
    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
