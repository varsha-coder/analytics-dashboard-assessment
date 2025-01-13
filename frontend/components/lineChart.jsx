import React, { useContext, useEffect, useState, Suspense } from "react";
import { getCountByManufacterer } from "../Helpers/countByManufacturer";
import { getProducedInYear } from "../Helpers/ProductionInYear";
import { MainContext } from "../src/utils/MainContext";

// Dynamic import for the chart component using React.lazy
const Chart = React.lazy(() => import("react-apexcharts"));

const LineChart = () => {
  const mainContext = useContext(MainContext);

  // Line Chart data
  const [prodCountArr, setProdCountArr] = useState([]);
  const [prodYrArr, setProdYrArr] = useState([]);
  const [makeProdCountArr, setMakeProdCountArr] = useState([]);

  // Data manipulation
  useEffect(() => {
    const productionArr = getProducedInYear();
    console.log(productionArr);

    setProdCountArr(productionArr?.map((item) => item?.count));
    setProdYrArr(productionArr?.map((item) => item?.production));

    const manufactererCountObj = getCountByManufacterer(
      mainContext?.sidebarFilters?.make ?? ""
    );
    console.log(manufactererCountObj);
    console.log(mainContext);
    console.log("Selected Manufacturer:", mainContext?.sidebarFilters?.make);

    const manufactererCountArr = productionArr
      ?.map((item) => item?.production)
      ?.map((year) => ({
        production: year,
        count: manufactererCountObj[year] ?? 0,
      }));
    setMakeProdCountArr(manufactererCountArr?.map((item) => item?.count));
  }, [mainContext?.sidebarFilters?.make]);

  // Setting up graph
  const series = [
    {
      name: "No. of Total EVs",
      data: [...prodCountArr],
    },
    {
      name: `No. of ${mainContext?.sidebarFilters?.make}`,
      data: [...makeProdCountArr],
    },
  ];
  const options = {
    chart: {
      type: "line",
      fontFamily: "Nunito",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [...prodYrArr],
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
        text: "EVs in Market",
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
      axisBorder: {
        color: "#FFFFFF",
      },
      axisTicks: {
        color: "#FFFFFF",
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
        Electric Vehicle in Market by Year
      </p>
      <Suspense
        fallback={
          <p className="text-2xl font-semibold text-center h-44">Loading...</p>
        }
      >
        <Chart options={options} series={series} type="line" height={350} />
      </Suspense>
    </div>
  );
};

export default LineChart;
