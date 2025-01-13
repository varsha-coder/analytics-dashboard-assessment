import React, { useEffect, useState, Suspense } from "react";
import { getMakers } from "../Helpers/make";

const Chart = React.lazy(() => import("react-apexcharts"));

interface ChartData {
  x: string;
  y: number;
}

const TreeMap = () => {
  const [dataArr, setDataArr] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const makeArr = getMakers();
    if (makeArr && Array.isArray(makeArr)) {
      const makeArrFormatted = makeArr.map((curr: any) => ({
        x: curr.name,
        y: curr.value,
      }));
      setDataArr(makeArrFormatted);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 p-4 m-4 rounded-2xl border-gray-700 border shadow-md">
        <p className="text-2xl font-semibold text-center h-44 text-gray-300">
          Loading...
        </p>
      </div>
    );
  }

  if (dataArr.length === 0) {
    return (
      <div className="bg-gray-800 p-4 m-4 rounded-2xl border-gray-700 border shadow-md">
        <p className="text-2xl font-semibold text-center h-44 text-gray-300">
          No data available
        </p>
      </div>
    );
  }

  const series = [
    {
      data: dataArr || [],
    },
  ];

  const options = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
      fontFamily: "Nunito",
      background: "#1f2937",
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#1f77b4",
            },
            {
              from: 51,
              to: 100,
              color: "#ff7f0e",
            },
          ],
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#ffffff"],
        fontSize: "13px",
        fontWeight: "bold",
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="bg-gray-800 p-4 m-4 rounded-2xl border-gray-700 border shadow-md">
      <p className="text-xl font-bold ml-2 text-white">
        Market Presence by Manufacturer
      </p>

      <Suspense
        fallback={
          <p className="text-2xl font-semibold text-center h-44 text-gray-300">
            Loading...
          </p>
        }
      >
        <Chart options={options} series={series} type="treemap" height={350} />
      </Suspense>
    </div>
  );
};

export default TreeMap;
