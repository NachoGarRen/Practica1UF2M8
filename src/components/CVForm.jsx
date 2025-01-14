import React, { useState } from "react";

const CVForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    experience: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/api/updateCV", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        onUpdate(formData); // Llamada para actualizar el CVPreview
        alert("Datos actualizados correctamente");
      } else {
        alert("Error al actualizar los datos");
      }
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="profession" className="block">Profesión:</label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="experience" className="block">Experiencia:</label>
        <input
          type="text"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <button type="submit" className="btn">Actualizar</button>
    </form>
  );
};

export default CVForm;
