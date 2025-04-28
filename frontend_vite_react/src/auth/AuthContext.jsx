import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [usuario, setUsuario] = useState(() => localStorage.getItem('usuario') || null);
  const [rol, setRol] = useState(() => localStorage.getItem('rol') || null);

  const login = (nuevoToken, nuevoUsuario, nuevoRol) => {
    try {
      localStorage.setItem('token', nuevoToken);
      localStorage.setItem('usuario', nuevoUsuario);
      localStorage.setItem('rol', nuevoRol);

      setToken(nuevoToken);
      setUsuario(nuevoUsuario);
      setRol(nuevoRol);

      navigate("/"); // Redirige sin recargar la página
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');

      setToken(null);
      setUsuario(null);
      setRol(null);

      navigate("/"); // Redirige sin recargar la página
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, usuario, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
