import React, { useContext, useEffect, useState, Suspense } from "react";
import { getMakeCountByCity } from "../Helpers/MakeCountryBycity";
import { MainContext } from "../src/utils/MainContext";

const Chart = React.lazy(() => import("react-apexcharts"));

const BarChart = () => {
  const mainContext = useContext(MainContext);

  const [make, setMake] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const makeArr = getMakeCountByCity(
      mainContext?.sidebarFilters?.city,
      mainContext?.sidebarFilters?.year
    );

    const makeDistributor = makeArr?.reduce((acc, curr) => {
      acc.push(curr?.make);
      return acc;
    }, []);

    const countOfDistributor = makeArr?.map((curr) => curr?.count);

    setMake([...makeDistributor]);
    setCount([...countOfDistributor]);
  }, [mainContext?.sidebarFilters?.city, mainContext?.sidebarFilters?.year]);

  const series = [
    {
      name: "No. of EVs",
      data: [...(count ?? [])],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      background: "transparent",
    },
    colors: ["#00BFFF", "#FFD700", "#32CD32"],
    xaxis: {
      categories: [...(make ?? [])],
      labels: {
        style: {
          fontFamily: "Nunito",
          fontSize: "13px",
          fontWeight: "bold",
          color: "#FFFFFF",
        },
      },
      axisBorder: {
        color: "#FFFFFF",
      },
      axisTicks: {
        color: "#FFFFFF",
      },
    },
    yaxis: {
      title: {
        text: "No. of EVs",
        style: {
          fontFamily: "Nunito",
          fontSize: "13px",
          color: "#FFFFFF",
        },
      },
      labels: {
        style: {
          fontFamily: "Nunito",
          fontSize: "13px",
          color: "#FFFFFF",
        },
      },
    },
    legend: {
      fontSize: "13px",
      fontFamily: "Nunito",
      fontWeight: "bold",
      labels: {
        colors: "#FFFFFF",
      },
    },
    grid: {
      borderColor: "#444",
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="bg-gray-800 p-4 m-4 rounded-2xl border-gray-700 border-1 shadow-md">
      <p className="text-xl font-bold ml-2 text-white">
        Electric Vehicles By City In A Year
      </p>
      <Suspense
        fallback={
          <p className="text-2xl font-semibold text-center h-44">Loading...</p>
        }
      >
        <Chart options={options} series={series} type="bar" height={350} />
      </Suspense>
    </div>
  );
};

export default BarChart;
