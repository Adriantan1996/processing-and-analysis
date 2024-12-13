import React from "react";
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
import { Line } from "react-chartjs-2";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteChart } from "../../state/chartSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export interface LineChartProps {
  chartLabel: string;
  chartId: string;
  labels: string[];
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({
  chartLabel,
  chartId,
  labels,
  data,
}) => {
  const dispatch = useDispatch(); // dispatch

  const chartData = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data,
        borderColor: "rgb(37, 12, 200)",
        backgroundColor: "rgba(56, 199, 235, 0.2)",
      },
    ],
  };
  const onDeleteHandler = () => {
    // delete Chart using reducer delete chart action
    dispatch(deleteChart(chartId));
  };
  return (
    <div className="relative">
      <Line options={options} data={chartData} className="h-64 w-full" />
      <button
        className="absolute top-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-red-300"
        onClick={onDeleteHandler}
      >
        <FaTrash className="text-red-600" />
      </button>
    </div>
  );
};

export default LineChart;
