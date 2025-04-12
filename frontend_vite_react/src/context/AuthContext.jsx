import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Verifica si el usuario ya está autenticado (ej: al recargar la página)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://127.0.0.1:8000/api/auth/user/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
        }
    }, []);

    // Función para iniciar sesión
    const login = async (credentials) => {
        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/auth/login/", credentials);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return true;
        } catch (error) {
            console.error("Error en el login", error);
            return false;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
