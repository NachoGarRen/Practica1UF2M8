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
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://172.17.22.153/api.php", {
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
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
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
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <Line data={chartData} />
    </div>
  );
};

export default StatsChart;
