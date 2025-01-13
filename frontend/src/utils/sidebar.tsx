import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "./MainContext";
import { motion } from "framer-motion";
import {
  Factory,
  Globe,
  MapPinCheckInside,
  CalendarArrowUp,
  Menu,
} from "lucide-react";

type Filters = {
  make: string;
  county: string;
  city: string;
  year: string;
};

const SIDEBAR_ITEMS = [
  {
    name: "Manufacturer",
    icon: Factory,
    color: "#6366f1",
    filterKey: "make",
  },
  {
    name: "County",
    icon: Globe,
    color: "#EC4899",
    filterKey: "county",
  },
  {
    name: "City",
    icon: MapPinCheckInside,
    color: "#10B981",
    filterKey: "city",
  },
  {
    name: "Year",
    icon: CalendarArrowUp,
    color: "#3B82F6",
    filterKey: "year",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    make: "",
    county: "",
    city: "",
    year: "",
  });
  const [makersArr, setMakersArr] = useState<string[]>([]);
  const [countyList, setCountyList] = useState<string[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);
  const [yearList, setYearList] = useState<string[]>([]);

  const mainContext = useContext(MainContext);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    console.log(`Selected ${name}:`, value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    mainContext?.setSidebarFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (mainContext) {
      setCountyList(mainContext?.countyList || []);
      setCityList(mainContext?.cityList || []);
      setYearList(mainContext?.yearList || []);
      setMakersArr(mainContext?.makersList || []);

      setSelectedFilters((prevFilters) => ({
        make: prevFilters.make || mainContext.makersList[0] || "",
        county: prevFilters.county || mainContext.countyList[0] || "",
        city: prevFilters.city || mainContext.cityList[0] || "",
        year: prevFilters.year || mainContext.yearList[0] || "",
      }));
    }

  }, []);

  useEffect(() => {
    console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="h-full">
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-20"
        } h-full`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
          <div className="mt-6 space-y-4">
            {SIDEBAR_ITEMS.map(({ name, icon: Icon, color, filterKey }) => (
              <div
                key={filterKey}
                className="flex flex-col items-start group cursor-pointer"
              >
                <div className="flex items-center p-4">
                  <Icon size={26} style={{ color }} className="mr-4" />

                  {isSidebarOpen && (
                    <span className="text-white font-semibold ml-6">
                      {name}
                    </span>
                  )}
                </div>

                {isSidebarOpen && (
                  <div className="w-full">
                    <select
                      name={filterKey}
                      value={selectedFilters[filterKey]}
                      onChange={handleFilterChange}
                      className="bg-gray-800 text-white w-full p-4 rounded h-12 mt-2"
                    >
                      {filterKey === "make" &&
                        makersArr?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      {filterKey === "county" &&
                        countyList?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      {filterKey === "city" &&
                        cityList?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      {filterKey === "year" &&
                        yearList?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
