import React, { useState, useEffect, Suspense } from "react";
import { extractEVData } from "../Helpers/evData";

const ReactApexChart = React.lazy(() => import("react-apexcharts"));

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const data = extractEVData();
    setChartData(data);
  }, []);

  const options = {
    chart: {
      type: "pie",
      fontFamily: "Nunito",
    },
    labels: chartData.labels,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -8,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      style: {
        colors: ["#FFFFFF"],
      },
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      position: "bottom",
      fontSize: "13px",
      fontFamily: "Nunito",
      fontWeight: "bold",
      labels: {
        colors: "#FFFFFF",
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="bg-gray-800 p-4 m-4 rounded-2xl shadow-md">
      <p className="text-xl font-bold text-white ml-2">
        Electric Vehicle Distribution
      </p>
      <Suspense
        fallback={
          <p className="text-2xl font-semibold text-center h-44">Loading...</p>
        }
      >
        <div style={{ width: "100%", height: "300px" }}>
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="pie"
            height={350}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ApexChart;
