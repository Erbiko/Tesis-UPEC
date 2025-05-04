import { useState } from 'react';
import { api } from "../../api/axios";

export default function Chatbot() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!pregunta.trim()) return;

    setCargando(true);
    setRespuesta('');

    try {
      const res = await api.post('/chatbot/preguntar/', { pregunta });
      setRespuesta(res.data.respuesta);
    } catch (error) {
      console.error('Error al consultar al chatbot:', error);
      setRespuesta('Ocurrió un error al procesar la pregunta.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 mt-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Asistente Virtual sobre la Ley 162</h2>

      {/* Espacio de Chat */}
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-6">
        {pregunta && (
          <div className="flex flex-col items-start">
            <div className="bg-blue-100 text-blue-900 p-3 rounded-lg max-w-[80%] self-end">
              <span className="font-semibold">Tú:</span> {pregunta}
            </div>
          </div>
        )}

        {cargando && (
          <p className="italic text-gray-500">Consultando los archivos sagrados de la ley...</p>
        )}

        {respuesta && (
          <div className="flex flex-col items-start">
            <div className="bg-green-100 text-green-900 p-3 rounded-lg max-w-[80%]">
              <span className="font-semibold">Asistente:</span> {respuesta}
            </div>
          </div>
        )}
      </div>

      {/* Input abajo */}
      <form onSubmit={manejarEnvio} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí..."
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {cargando ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
