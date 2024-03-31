import parseCSV from "./parseCSV";

// Continental US general latlong -130,20,-60,50

// socal local
const firmsURL ='https://firms.modaps.eosdis.nasa.gov/usfs/api/area/csv/e538d9b4f7e437266b0fa0e9749a5599/VIIRS_NOAA20_NRT/-118,31,-116,34/3/';

// USA
// const firmsURL ='https://firms.modaps.eosdis.nasa.gov/usfs/api/country/csv/e538d9b4f7e437266b0fa0e9749a5599/VIIRS_NOAA20_NRT/USA/3/';

const getFires = async () => {
  try { 
    const fireData = await fetch(firmsURL);
    const fireDataCSV = await fireData.text();
    const firesArray = parseCSV(fireDataCSV);
    return firesArray;
  } catch (error) {
    console.log(error)
  };
}

export default getFires;

