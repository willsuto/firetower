const parseCSV = require('./parseCSV');

// Continental US general latlong -130,20,-60,50

// socal local
// const firmsURL ='https://firms.modaps.eosdis.nasa.gov/usfs/api/area/csv/e538d9b4f7e437266b0fa0e9749a5599/VIIRS_NOAA20_NRT/-118,31,-116,34/3/';

// USA
// const firmsURL ='https://firms.modaps.eosdis.nasa.gov/usfs/api/country/csv/e538d9b4f7e437266b0fa0e9749a5599/VIIRS_NOAA20_NRT/USA/3/';

//MODIS USA 3 day
const firmsURL ='https://firms.modaps.eosdis.nasa.gov/usfs/api/country/csv/e538d9b4f7e437266b0fa0e9749a5599/MODIS_NRT/USA/3';

//USA VIIRS 20 
// const firmsURL ='https://firms.modaps.eosdis.nasa.gov/usfs/api/country/csv/e538d9b4f7e437266b0fa0e9749a5599/VIIRS_NOAA20_NRT/USA/1'


const getFires = async () => {
  try { 
    const fireData = await fetch(firmsURL, { mode: 'no-cors' });
    const fireDataCSV = await fireData.text();
    const firesArray = parseCSV(fireDataCSV);
    console.log('parsed results from fetch', firesArray)
    return firesArray;
  } catch (error) {
    console.log(error)
  };
}

module.exports = getFires;

