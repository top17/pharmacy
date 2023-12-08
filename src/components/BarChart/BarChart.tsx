import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ChartBar = () => {
  const [chartData, setChartData] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(config.apiUrl);
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const barColors = [
    "#FFD700",
    "#FF6347",
    "#065606",
    "#8A2BE2",
    "#87CEEB",
    "#FFA07A",
    "#20B2AA",
    "#FF4500",
    "#9370DB",
    "#FF8C00",
  ];

  const sortedData = chartData.slice().sort((a, b) => b.price - a.price);

  const mostExpensive = sortedData.slice(0, 5);
  const leastExpensive = sortedData.slice(-5);

  return (
    <div style={{ width: "1200px" }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={[...mostExpensive, ...leastExpensive]}
          margin={{
            top: 50,
            right: 0,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="price"
            name="Price of medicine"
            fill="grey"
            label={{ position: "top" }}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColors[index % barColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
