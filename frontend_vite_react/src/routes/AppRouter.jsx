// routes/AppRouter.jsx
import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from '../pages/Home';
import Login from '../pages/Login';
import RegistroInvitado from '../pages/RegistroInvitado';
import NoticiaDetalle from '../pages/NoticiaDetalle';
import Noticias from "../components/Noticias";
import CrearNoticia from "../pages/CrearNoticia";
import MisNoticias from "../pages/MisNoticias";
import EditarNoticia from "../pages/EditarNoticia";
import PanelAdmin from "../pages/PanelAdmin";
import AprobacionNoticias from "../pages/AprobacionNoticias";
import CRUDUsuarios from "../pages/CRUD.usuario";

const AppRouter = () => {
  const [rol, setRol] = useState(localStorage.getItem("rol"));

  useEffect(() => {
    const handleStorageChange = () => {
      setRol(localStorage.getItem("rol"));
    };

    // Escuchamos cambios en el localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<RegistroInvitado />} />
      <Route path="/noticia/:id" element={<NoticiaDetalle />} />

      {/* Invitados y Periodistas */}
      {(rol === "periodista" || rol === "invitado") && (
        <>
          <Route path="/noticias" element={<Noticias />} />
        </>
      )}

      {/* Solo Periodistas */}
      {rol === "periodista" && (
        <>
          <Route path="/crear-noticia" element={<CrearNoticia />} />
          <Route path="/mis-noticias" element={<MisNoticias />} />
          <Route path="/editar-noticia/:id" element={<EditarNoticia />} />
        </>
      )}

      {/* Solo Administrador */}
      {rol === "admin" && (
        <>
          <Route path="/admin/panel" element={<PanelAdmin />} />
          <Route path="/admin/aprobaciones" element={<AprobacionNoticias />} />
          <Route path="/admin/usuarios" element={<CRUDUsuarios />} />
        </>
      )}

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;










