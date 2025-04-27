import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [rol, setRol] = useState(localStorage.getItem('rol')); // ⬅️ Añadimos rol aquí

  const login = (nuevoToken, nuevoUsuario, nuevoRol) => {
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('usuario', nuevoUsuario);
    localStorage.setItem('rol', nuevoRol);

    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
    setRol(nuevoRol);

    window.location.href = "/"; // ⬅️ Refrescamos y llevamos a Inicio tras login
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    setToken(null);
    setUsuario(null);
    setRol(null);

    window.location.href = "/"; // ⬅️ Refrescamos y llevamos a Inicio tras logout
  };

  return (
    <AuthContext.Provider value={{ token, usuario, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
