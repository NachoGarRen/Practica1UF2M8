import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { API_URL } from "../config";

const CVPreview = () => {
  const [cvData, setCVData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error en la autenticación o conexión");
        const data = await response.json();
        setCVData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el CV:", error);
        setLoading(false);
      }
    };

    fetchCVData();
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!cvData) {
    return <div>No se pudo obtener el CV.</div>;
  }

  const generatePDF = () => {
    const { name, profession, experience, email } = cvData;
    const doc = new jsPDF();
  
    // Configurar fuente y colores
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40, 44, 52);
  
    // Título
    doc.text("Curriculum Vitae", 105, 20, { align: "center" });
  
    // Separador
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 25, 190, 25);
  
    // Datos personales con diseño
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 64, 70);
  
    // Bloque de información
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 30, 170, 90, "F");
  
    doc.setFont("helvetica", "bold");
    doc.text("Información Personal", 25, 40);
  
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${name}`, 25, 50);
    doc.text(`Profesión: ${profession}`, 25, 60);
    doc.text(`Experiencia: ${experience}`, 25, 70);
    doc.text(`Correo Electrónico: ${email}`, 25, 80);
  
    // Pie de página
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Generado con jsPDF y Nacho Garcia :)", 105, 290, { align: "center" });
  
    // Guardar PDF
    doc.save("cv.pdf");
  };
  
  return (
    <div className="space-y-6">
      <table className="table-auto w-full border-collapse text-gray-700">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 font-medium">Nombre:</td>
            <td className="px-4 py-2">{cvData.name}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-medium">Profesión:</td>
            <td className="px-4 py-2">{cvData.profession}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-medium">Experiencia:</td>
            <td className="px-4 py-2">{cvData.experience}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Correo Electrónico:</td>
            <td className="px-4 py-2">{cvData.email}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={generatePDF}
        className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg mt-4 hover:bg-indigo-700 transition duration-200"
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default CVPreview;
