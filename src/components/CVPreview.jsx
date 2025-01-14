import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const CVPreview = () => {
  const [cvData, setCVData] = useState(null); // Estado para almacenar los datos del CV
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Efecto para obtener los datos del CV desde la API
  useEffect(() => {
    fetch("http://172.17.22.153/api.php")  // Corregir la URL aquí
      .then((res) => res.json())
      .then((data) => {
        setCVData(data);
        setLoading(false); // Cambia el estado de carga una vez se obtienen los datos
      })
      .catch((error) => {
        console.error("Error fetching CV data:", error);
        setLoading(false); // Asegúrate de que el estado de carga cambie incluso si hay error
      });
  }, []); // Este efecto se ejecutará solo una vez cuando el componente se monte

  if (loading) {
    return <div>Cargando...</div>; // Muestra "Cargando..." mientras se obtienen los datos
  }

  if (!cvData) {
    return <div>No se pudo obtener el CV.</div>; // Muestra un mensaje si no hay datos
  }

  // Función para generar el PDF
  const generatePDF = () => {
    const { name, profession, experience, email } = cvData;
    const doc = new jsPDF();
    doc.text("Curriculum Vitae", 10, 10);
    doc.text(`Nombre: ${name}`, 10, 20);
    doc.text(`Profesión: ${profession}`, 10, 30);
    doc.text(`Experiencia: ${experience}`, 10, 40);
    doc.text(`Correo Electrónico: ${email}`, 10, 50);
    doc.save("cv.pdf");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Vista Previa del CV</h1>
      <p><strong>Nombre:</strong> {cvData.name}</p>
      <p><strong>Profesión:</strong> {cvData.profession}</p>
      <p><strong>Experiencia:</strong> {cvData.experience}</p>
      <p><strong>Correo Electrónico:</strong> {cvData.email}</p>
      <button onClick={generatePDF} className="btn mt-4">Descargar PDF</button>
    </div>
  );
};

export default CVPreview;
