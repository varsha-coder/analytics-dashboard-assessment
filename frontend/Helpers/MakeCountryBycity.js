import {dataset} from '../public/DataSet'
export const getMakeCountByCity = (city, year) => {
    const cityLowerCase = city?.toLowerCase()
    const yearInNumber = Number(year)
    const makeObj = dataset?.reduce((acc, curr) => {
      if (curr?.City?.toLowerCase() === cityLowerCase && Number(curr?.["Model Year"]) === yearInNumber) {
        acc[curr.Make] = (acc[curr.Make] || 0) + 1
      }
      return acc
    }, {})
    return Object.keys(makeObj)?.map(make => ({
      make,
      count: makeObj[make]
    }))
  
  }