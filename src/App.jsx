import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import CVPreview from "./components/CVPreview";

function App() {
  return (
    <div className="App">
      {/* Aquí puedes mostrar el componente CVPreview */}
      <CVPreview />
    </div>
  );
}

export default App;