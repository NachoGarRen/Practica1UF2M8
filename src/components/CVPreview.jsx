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
    doc.text("Curriculum Vitae", 10, 10);
    doc.text(`Nombre: ${name}`, 10, 20);
    doc.text(`Profesión: ${profession}`, 10, 30);
    doc.text(`Experiencia: ${experience}`, 10, 40);
    doc.text(`Correo Electrónico: ${email}`, 10, 50);
    doc.save("cv.pdf");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Vista Previa del CV</h1>
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
