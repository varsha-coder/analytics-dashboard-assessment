import {dataset} from '../public/DataSet'

export const getCountByManufacterer = (make) => {
    const makeLowerCase = make?.toLowerCase()
    const makeArr = dataset.reduce((acc, car) => {
      if (car.Make.toLowerCase() === makeLowerCase) {
        acc[car["Model Year"]] = (acc[car["Model Year"]] || 0) + 1;
      }
      return acc;
    }, {});
    return makeArr
  }