import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteChart } from "../../state/chartSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export interface BarChartProps {
  chartLabel: string;
  chartId: string;
  labels: string[];
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({
  chartLabel,
  chartId,
  labels,
  data,
}) => {
  const dispatch = useDispatch(); // dispatch reducer

  const chartData = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data,
        borderColor: "rgb(37, 12, 200)",
        backgroundColor: "rgba(0, 123, 255, 0.7)",
      },
    ],
  };
  const onDeleteHandler = () => {
    // delete Chart using reducer delete chart action
    dispatch(deleteChart(chartId));
  };
  return (
    <div className="relative">
      <Bar options={options} data={chartData} className="h-64 w-full" />
      <button
        className="absolute top-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-red-300"
        onClick={onDeleteHandler}
      >
        <FaTrash className="text-red-600" />
      </button>
    </div>
  );
};

export default BarChart;
