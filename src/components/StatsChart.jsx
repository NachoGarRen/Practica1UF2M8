import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    const fetchData = async () => {
      try {
        const response = await fetch("http://172.17.22.118/api.php");
        const data = await response.json();

        // Limpiar y transformar los datos para el gráfico
        const experience = data.experience.match(/\d+/); // Extraer el primer número de la cadena
        const yearsOfExperience = experience ? parseInt(experience[0], 10) : 0; // Si no hay número, colocar 0

        const transformedData = {
          labels: [data.name], // Usamos el nombre para la etiqueta
          datasets: [
            {
              label: "Años de Experiencia",
              data: [yearsOfExperience], // Usamos el número de años
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        };

        setChartData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Gráfico de Experiencia</h2>
      {chartData ? <Line data={chartData} /> : <p>No hay datos disponibles.</p>}
    </div>
  );
};

export default StatsChart;
