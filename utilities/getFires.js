import parseCSV from "./parseCSV";

const getFires = async () => {
  try { 
    const fireData = await fetch('https://firms.modaps.eosdis.nasa.gov/usfs/api/area/csv/e538d9b4f7e437266b0fa0e9749a5599/MODIS_NRT/-130,20,-60,50/1');
    const fireDataCSV = await fireData.text();
    const firesArray = parseCSV(fireDataCSV);
    return firesArray;
  } catch (error) {
    console.log(error)
  };
}

export default getFires;

