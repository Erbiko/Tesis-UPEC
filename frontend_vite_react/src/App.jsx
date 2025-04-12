import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NoticiasPage from "./pages/NoticiasPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<NoticiasPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;



