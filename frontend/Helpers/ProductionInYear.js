import {dataset} from '../public/DataSet'

export const getProducedInYear = () => {
    const prodCount = dataset.reduce((acc, curr) => {
      acc[curr?.["Model Year"]] = (acc[curr?.["Model Year"]] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(prodCount).map((production) => ({
      production,
      count: prodCount[production]
    }));
  };