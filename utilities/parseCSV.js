// Parse CSV to JS array of objects
function parseCSV(csvString) {
  const lines = csvString.trim().split('\n'); // Split CSV string into lines
  
  // Extract column headers from the first line
  const headers = lines[0].split(',');
  
  // Initialize an array to store the parsed data
  const data = [];
  
  // Iterate over the remaining lines
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(','); // Split line into values
    const entry = {};
    
    // Populate entry object with values
    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j];
    }
    
    data.push(entry); // Add entry to data array
  }
  
  return data;
};


module.exports = parseCSV;