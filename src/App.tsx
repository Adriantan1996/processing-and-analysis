import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import DisplayChart from "./components/DisplayChart/DisplayChart";
import MeanChart from "./components/MeanChart/MeanChart";
import WidgetsSelector from "./components/WidgetsSelector/WidgetsSelector";
import Layout from "./Layout/Layout";

function App() {
  return (
    <Layout>
      <div className="py-2 space-y-6 bg-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          CSV File Processing And Analysis
        </h1>
        <DataTable />
        <div className="flex">
          <MeanChart />
          <WidgetsSelector />
        </div>
        <DisplayChart />
      </div>
    </Layout>
  );
}

export default App;
