import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import ChartRenderer, {
  ChartRendererData,
} from "../ChartRenderer/ChartRenderer";

const DisplayChart = () => {
  const files = useSelector((state: RootState) => state.csv.files); // retrieve files from store
  const activeFileId = useSelector(
    (state: RootState) => state.csv.activeFileId
  );
  const activeFile = files.find((file) => file.id === activeFileId); // retrieve active file
  const chartArray = useSelector((state: RootState) => state.chart.charts);
  const activeChartArray = chartArray.filter(
    (chart) => chart.fileId === activeFileId
  );

  const chartArrayWithData: ChartRendererData[] = activeChartArray.map(
    ({ chartType, id, xColumn, yColumn }) => {
      const label = activeFile!.data.map((item) => item[xColumn]);
      const data = activeFile!.data.map((item) => Number(item[yColumn]));
      const chartLabel = `${xColumn} x ${yColumn}`;
      return { chartType, chartId: id, label, data, chartLabel };
    }
  );
  return (
    <div>
      <ChartRenderer data={chartArrayWithData} />
    </div>
  );
};

export default DisplayChart;
