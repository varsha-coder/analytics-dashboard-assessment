import { dataset } from "../../public/DataSet";
import React, { createContext, useCallback, useEffect, useState } from "react";

export const MainContext = createContext();

console.log(dataset);

const MainContextWrapper = (props) => {
  const [makersList, setMakersList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [sidebarFilters, setSidebarFilters] = useState({});

  const makersListArrFunc = useCallback(() => {
    const extractedList = dataset.map((item) => item.Make);
    console.log("Extracted list in makersListArrFunc", extractedList);
    setMakersList([...new Set(extractedList.sort())]);
  }, []);

  const countyListArrFunc = useCallback(() => {
    const extractedList = dataset.map((item) => item.County);
    console.log("Extracted list in CountyListArrFunc", extractedList);
    setCountyList([...new Set(extractedList.sort())]);
  }, []);

  const cityListArrFunc = useCallback(() => {
    const extractedList = dataset.map((item) => item.City);
    console.log("Extracted list in cityListArrFunc", extractedList);
    setCityList([...new Set(extractedList.sort())]);
  }, []);

  const yearListArrFunc = useCallback(() => {
    const extractedList = dataset.map((item) => item["Model Year"]);
    console.log("Extracted list in yearListArrFunc", extractedList);
    setYearList([...new Set(extractedList.sort((a, b) => a - b))]);
  }, []);

  useEffect(() => {
    console.log("Dataset loaded:", dataset);
    makersListArrFunc();
    cityListArrFunc();
    countyListArrFunc();
    yearListArrFunc();
  }, []);

  const state = {
    makersList,
    countyList,
    cityList,
    yearList,
    sidebarFilters,
    setSidebarFilters,
  };

  return (
    <MainContext.Provider value={{ ...state }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContextWrapper;
