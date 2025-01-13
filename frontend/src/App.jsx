import { useState } from "react";
import TreeMap from "../components/Makers";
import ApexChart from "../components/pie";
import SideBar from "./utils/sidebar";
import Overview from "./utils/OverView";
import LineChart from "../components/lineChart";
import BarChart from "../components/BarChart";
import CountyBar from "../components/CountyBar";
import MainContextWrapper from "../src/utils/MainContext";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <MainContextWrapper>
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-gray-800 flex flex-col h-full transition-all duration-300`}
        >
          <SideBar setIsSidebarOpen={setIsSidebarOpen} />
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <Overview />

          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
              <TreeMap />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ApexChart />
              <LineChart />
              <BarChart />
              <CountyBar />
            </div>
          </div>
        </div>
      </MainContextWrapper>
    </div>
  );
}

export default App;
