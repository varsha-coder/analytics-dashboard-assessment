import React, { useContext, useEffect, useState, Suspense } from "react";
import { getElectricUtilitiesByCounty } from "../Helpers/ElectricUtilityByCountry";
import { MainContext } from "../src/utils/MainContext";

const Chart = React.lazy(() => import("react-apexcharts"));

const CountyBar = () => {
  const mainContext = useContext(MainContext);
  const [elecUtility, setElecUtility] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const elecUtilityArr = getElectricUtilitiesByCounty(
      mainContext?.sidebarFilters?.county
    );

    const electricUtilityArr = elecUtilityArr?.reduce((acc, curr) => {
      acc.push(curr?.county);
      return acc;
    }, []);

    const countOfElecUtility = elecUtilityArr?.map((curr) => curr?.count);

    setElecUtility([...electricUtilityArr]);
    setCount([...countOfElecUtility]);
  }, [mainContext?.sidebarFilters?.county]);

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
    xaxis: {
      categories: [...(elecUtility ?? [])],
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
        Electric Utilities By County
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

export default CountyBar;
