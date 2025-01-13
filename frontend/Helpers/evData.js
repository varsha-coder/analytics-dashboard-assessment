import {dataset} from '../public/DataSet'

export function extractEVData() {
 
  const evTypeCount = {
    'Battery Electric Vehicle (BEV)': 0,
    'Plug-in Hybrid Electric Vehicle (PHEV)': 0,
  };

  dataset.forEach(item => {
    const evType = item["Electric Vehicle Type"];
    if (evTypeCount[evType] !== undefined) {
      evTypeCount[evType]++;
    }
  });

  return {
    series: Object.values(evTypeCount),
    labels: Object.keys(evTypeCount),
  };
}
