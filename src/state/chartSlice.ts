import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export enum ChartType {
  Line = "Line",
  Bar = "Bar",
  Pie = "Pie",
}
export interface ChartData {
  id: string; // chart id to reference for delete
  chartType: ChartType; // assign the chart type
  xColumn: string; // x axis of the chart
  yColumn: string; // y axis of the chart
  fileId: string | null; // Link the chart to a specific file
}

interface ChartState {
  charts: ChartData[];
}

const initialState: ChartState = {
  charts: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<Omit<ChartData, "id">>) => {
      const newChart: ChartData = {
        id: `${Date.now()}`, // Generate a unique ID
        ...action.payload,
      };
      state.charts.push(newChart);
    },
    deleteChart: (state, action: PayloadAction<string>) => {
      state.charts = state.charts.filter(
        (chart) => chart.id !== action.payload // delete chart
      );
    },
  },
});

export const { addChart, deleteChart } = chartSlice.actions;
export default chartSlice.reducer;
