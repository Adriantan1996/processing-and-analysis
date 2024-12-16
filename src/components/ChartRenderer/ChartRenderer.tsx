import React from "react";
import LineChart from "../LineChart/LineChart";
import { ChartType } from "../../state/chartSlice";
import BarChart from "../BarChart/BarChart";
import PieChart from "../PieChart/PieChart";
import useModal from "../hooks/useModal";

/**
 * @param 
 * Map Data display according tho the chartType in array
 * @returns NIL
 */
export interface ChartRendererData {
  chartType: ChartType;
  chartId: string;
  label: string[];
  data: number[];
  chartLabel: string;
}

export interface ChartRendererProps {
  data: ChartRendererData[];
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ data }) => {
  const { isModalOpen } = useModal();
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${
        isModalOpen ? "pointer-events-none" : ""
      }`}
    >
      {data.map(({ chartType, chartId, label, data, chartLabel }) => {
        return (
          <div key={chartId} className="border border-gray-300 p-4 rounded-lg">
            {chartType === ChartType.Line && (
              <LineChart
                key={chartId} //Key
                labels={label} // Pass the labels array
                data={data} // Pass the data array
                chartId={chartId} // Pass the chart ID as a prop
                chartLabel={chartLabel}
              />
            )}
            {chartType === ChartType.Bar && (
              <BarChart
                key={chartId} //Key
                labels={label} // Pass the labels array
                data={data} // Pass the data array
                chartId={chartId} // Pass the chart ID as a prop
                chartLabel={chartLabel}
              />
            )}
            {chartType === ChartType.Pie && (
              <PieChart
                key={chartId} //Key
                labels={label} // Pass the labels array
                data={data} // Pass the data array
                chartId={chartId} // Pass the chart ID as a prop
                chartLabel={chartLabel}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChartRenderer;
