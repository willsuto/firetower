const bcrypt = require('bcryptjs');
const db = require('../dbModel');

const userController = {};

// checking to make sure a user with that name doesn't already exist in db
userController.checkDups = async (req, res, next) => {
  const queryResult = await db.query('SELECT username FROM users');
  const rows = queryResult.rows;
  const usernames = rows.map(row => row.username);
  if (usernames.includes(req.body.username)) {
    console.log('Username already exists')
    return res.status(200).json('User already exists');
  }
  else next();
}

userController.createUser = async (req, res, next) => {

  const { username, password } = req.body;
  
  bcrypt.hash(password, 10, async (err, hash) => {
    const text = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, home_lat, home_long`;
    const params = [ username, hash ];
    const queryResponse = await db.query( text, params);
    console.log(queryResponse.rows[0]) 
  });
  console.log(`${username} signed up`)
  return next();
}

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const text = `SELECT * FROM users WHERE username=($1)`;

  const params = [ username ]

  const queryResponse = await db.query(text, params);

  const hashedPassword = queryResponse.rows[0].password;

  bcrypt.compare(password, hashedPassword, (err, response) => { 
    response ? res.locals.message = 'Login successful' : res.locals.message = 'Login unsuccessful';
    next();
  })
}

module.exports = userController;