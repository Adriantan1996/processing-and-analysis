import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteChart } from "../../state/chartSlice";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// eslint-disable-next-line react-refresh/only-export-components
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};
// Function to generate a random RGBA color
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = (Math.random() * 0.5 + 0.5).toFixed(2); // Random alpha between 0.5 and 1

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export interface PieChartProps {
  chartLabel: string;
  chartId: string;
  labels: string[];
  data: number[];
}

const PieChart: React.FC<PieChartProps> = ({
  chartLabel,
  chartId,
  labels,
  data,
}) => {
  const dispatch = useDispatch(); // dispatch
  // only for barchart colors
  const backgroundColors = labels.map(() => generateRandomColor());
  const borderColors = labels.map(() => generateRandomColor());
  const chartData = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data,
        borderColor: backgroundColors,
        backgroundColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const onDeleteHandler = () => {
    // delete Chart using reducer delete chart action
    dispatch(deleteChart(chartId));
  };

  return (
    <div className="relative">
      <Pie options={options} data={chartData} className="h-64 w-full" />
      <button
        className="absolute top-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-red-300"
        onClick={onDeleteHandler}
      >
        <FaTrash className="text-red-600" />
      </button>
    </div>
  );
};

export default PieChart;
