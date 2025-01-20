import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API_URL } from "../config";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error en la autenticación o conexión");
        const data = await response.json();

        const experience = data.experience.match(/\d+/);
        const yearsOfExperience = experience ? parseInt(experience[0], 10) : 0;

        const transformedData = {
          labels: [data.name],
          datasets: [
            {
              label: "Años de Experiencia",
              data: [yearsOfExperience],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Cargando gráfico...</div>;
  }

  return (
    <div
      className="bg-white p-3 rounded-xl shadow-xl mx-auto mt-10"
      style={{ width: "50%", height: "50%" }} // Reduce el tamaño a la mitad
    >
      <Bar data={chartData} />
    </div>
  );
};

export default StatsChart;
