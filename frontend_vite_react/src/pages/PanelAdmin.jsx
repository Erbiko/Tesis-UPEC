import { useEffect, useState } from "react";
import { api } from "../api/axios";

const PanelAdmin = () => {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    const fetchPendientes = async () => {
      try {
        const res = await api.get("noticias/");
        const soloPendientes = res.data.filter(n => !n.aprobado && n.estado === "pendiente");
        setPendientes(soloPendientes);
      } catch (err) {
        console.error("Error al cargar noticias pendientes", err);
      }
    };
    fetchPendientes();
  }, []);

  const aprobar = async (id) => {
    try {
      await api.put(`noticias/${id}/aprobar/`);
      setPendientes(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Error al aprobar", err);
    }
  };

  const rechazar = async (id) => {
    try {
      await api.put(`noticias/${id}/rechazar/`);
      setPendientes(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Error al rechazar", err);
    }
  };

  return (
    <div>
      <h2>Panel de Aprobación de Noticias</h2>
      {pendientes.length === 0 ? (
        <p>No hay noticias pendientes.</p>
      ) : (
        <ul>
          {pendientes.map((n) => (
            <li key={n.id}>
              <strong>{n.titulo}</strong> - por {n.periodista}
              <br />
              <button onClick={() => aprobar(n.id)}>✅ Aprobar</button>
              <button onClick={() => rechazar(n.id)}>❌ Rechazar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelAdmin;
