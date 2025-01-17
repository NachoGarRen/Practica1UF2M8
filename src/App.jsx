import React, { useState } from "react";
import Login from "./components/Login";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import StatsChart from "./components/StatsChart";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (receivedToken) => {
    localStorage.setItem("token", receivedToken); // Guarda el token en localStorage
    setToken(receivedToken); // Actualiza el estado
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpia el token
    setToken(null); // Restablece el estado
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">Aplicación de CV</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 transition duration-200"
        >
          Cerrar Sesión
        </button>
      </header>

      <div className="flex flex-1 space-x-6">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">Formulario</h2>
          <CVForm />
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">Vista Previa del CV</h2>
          <CVPreview />
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">Gráfico de Experiencia</h2>
        <StatsChart token={token} />
      </div>
    </div>
  );
}

export default App;
