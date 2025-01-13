import {dataset} from '../public/DataSet';

export const getMakers=()=>{
    const makeCount = dataset.reduce((acc, curr) => {
        acc[curr.Make] = (acc[curr.Make] || 0) + 1;
        return acc;
      }, {});
  
      return Object.keys(makeCount).map((make) => ({
        name: make,
        value: makeCount[make], 
      }));
}