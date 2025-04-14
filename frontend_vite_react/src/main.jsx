import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Noticias from "./components/Noticias";
import NoticiaDetalle from "./pages/NoticiaDetalle";
import "./index.css";

import { AuthProvider } from "./auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/noticia/:id" element={<NoticiaDetalle />} />
            </Routes>
        </Router>
    </AuthProvider>
);