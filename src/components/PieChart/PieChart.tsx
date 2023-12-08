import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import config from "../../config";

const ChartPie = () => {
  const [chartData, setChartData] = useState<IProduct[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<IProduct[]>(config.apiUrl);
        setChartData(data);
        const uniqueManufacturers = Array.from(
          new Set(data.map((product) => product.manufacturer.name))
        );
        setManufacturers(uniqueManufacturers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }
  if (chartData.length === 0 || manufacturers.length === 0) {
    return <div>Loading...</div>;
  }

  const COLORS = [
    "#0088FE",
    "#fafe00",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#6481af",
  ];

  const pieChartData = manufacturers.map((manufacturer) => ({
    name: manufacturer,
    value: chartData.filter(
      (product) => product.manufacturer.name === manufacturer
    ).length,
  }));

  return (
    <div style={{ width: "1000px", height: "500px" }}>
      <PieChart width={1000} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {pieChartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend formatter={(value) => `${value}`} />
      </PieChart>
    </div>
  );
};

export default ChartPie;
