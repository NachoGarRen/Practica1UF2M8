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
      const response = await fetch("http://172.17.22.118/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        if (onUpdate && typeof onUpdate === "function") {
          onUpdate(formData); // Actualiza la vista previa del CV si onUpdate es una función
        } else {
          console.log("onUpdate no es una función");
        }
        alert("Datos actualizados correctamente");
      } else {
        alert("Error al actualizar los datos");
      }
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="profession"
          className="block text-sm font-medium text-gray-700"
        >
          Profesión:
        </label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700"
        >
          Experiencia:
        </label>
        <textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default CVForm;
