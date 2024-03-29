const { Pool } = require('pg');

const PG_URI = 'postgres://ibnudcad:PAlEJ0M9YQ8O-morOoX-pM8P748_mZG7@bubble.db.elephantsql.com/ibnudcad';

const pool = new Pool({
  connectionString: PG_URI
});

// DB Notes
// Elephant SQL DB
// Schema:
// + Users
//   - username
    //  - password
    //  - home_location
 //etc

  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };