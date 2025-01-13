import {dataset} from '../public/DataSet'

export const getElectricUtilitiesByCounty = (county) => {
    const countyLowerCase = county?.toLowerCase()
    const countyObj = dataset?.reduce((acc, curr) => {
      if (countyLowerCase === curr?.County?.toLowerCase()) {
        acc[curr?.["Electric Utility"]] = (acc[curr?.["Electric Utility"]] || 0) + 1
      }
      return acc
    }, {})
    return Object.keys(countyObj)?.map(county => ({
      county,
      count: countyObj[county]
    }))
  }