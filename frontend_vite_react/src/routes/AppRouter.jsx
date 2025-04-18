// routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegistroInvitado from '../pages/RegistroInvitado';
import NoticiaDetalle from '../pages/NoticiaDetalle';
import Noticias from "../components/Noticias";
import CrearNoticia from "../pages/CrearNoticia";
import MisNoticias from "../pages/MisNoticias";
import EditarNoticia from "../pages/EditarNoticia";
import PanelAdmin from "../pages/PanelAdmin";




const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/noticias" element={<Noticias />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<RegistroInvitado />} />
    <Route path="/noticia/:id" element={<NoticiaDetalle />} />
    <Route path="/crear-noticia" element={<CrearNoticia />} />
    <Route path="/mis-noticias" element={<MisNoticias />} />    
    <Route path="/editar-noticia/:id" element={<EditarNoticia />} />
    <Route path="/admin/panel" element={<PanelAdmin />} />


  </Routes>
);

export default AppRouter;









