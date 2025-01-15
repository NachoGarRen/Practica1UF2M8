import React, { useState } from "react";
import CVPreview from "./components/CVPreview";
import CVForm from "./components/CVForm";
import StatsChart from "./components/StatsChart";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-6">
      <div className="flex flex-1 space-x-6">
        {/* Formulario */}
        <div className="w-1/2 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Formulario</h2>
          <CVForm />
        </div>

        {/* CV*/}
        <div className="w-1/2 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Vista Previa del CV</h2>
          <CVPreview  />
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Gráfico de Experiencia</h2>
        <StatsChart  />
      </div>
    </div>
  );
}

export default App;
