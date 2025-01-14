import React from "react";
import jsPDF from "jspdf";

const CVPreview = ({ cvData }) => {
  const { name, profession, experience, email } = cvData;

  const generatePDF = () => {
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
      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>Profesión:</strong> {profession}</p>
      <p><strong>Experiencia:</strong> {experience}</p>
      <p><strong>Correo Electrónico:</strong> {email}</p>
      <button onClick={generatePDF} className="btn mt-4">Descargar PDF</button>
    </div>
  );
};

export default CVPreview;
