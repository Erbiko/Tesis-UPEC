// routes/AppRouter.jsx
import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

import Home from "../pages/Home/Home";
import NoticiasPage from "../pages/NoticiasPage/NoticiasPage";
import NoticiaDetalle from "../pages/NoticiaDetalle/NoticiaDetalle";
import Login from "../pages/Login/Login";
import RegistroInvitado from "../pages/RegistroInvitado/RegistroInvitado";
import CrearNoticia from "../pages/CrearNoticia/CrearNoticia";
import MisNoticias from "../pages/MisNoticias/MisNoticias";
import EditarNoticia from "../pages/EditarNoticia/EditarNoticia";
import PanelAdmin from "../pages/PanelAdmin/PanelAdmin";
import AprobacionNoticias from "../pages/AprobacionNoticias/AprobacionNoticias";
import CRUDUsuarios from "../pages/CRUDUsuario/CRUDUsuario";

const AppRouter = () => {
  const { rol } = useAuth(); // ⬅️ Obtenemos el rol desde el contexto

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<RegistroInvitado />} />
      <Route path="/noticia/:id" element={<NoticiaDetalle />} />

      {/* Invitados y Periodistas */}
      {(rol === "periodista" || rol === "invitado") && (
        <>
          <Route path="/noticias" element={<NoticiasPage />} />
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










