const { Pool } = require('pg');

const PG_URI = 'postgres://ibnudcad:PAlEJ0M9YQ8O-morOoX-pM8P748_mZG7@bubble.db.elephantsql.com/ibnudcad';

const pool = new Pool({
  connectionString: PG_URI
});

/* DB Notes
Elephant SQL DB
Schema:
users
  - user_id
  - username
  - password
  - home_lat
  - home_long
  - home_location_set -- defaults to false
*/

  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };