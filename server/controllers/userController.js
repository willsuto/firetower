const bcrypt = require('bcryptjs');
const db = require('../dbModel');

const userController = {};

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

userController.createUser = (req, res, next) => {

  const { username, password } = req.body;
  
  bcrypt.hash(password, 10, (err, hash) => {
    const text = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    const params = [ username, hash ];
    db.query( text, params);
  });
  console.log(`${username} signed up`)
  return next();
}

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const text = `SELECT password FROM users WHERE username=($1)`;

  const params = [ username ]

  const response = await db.query(text, params);

  const hashedPassword = response.rows[0].password;

  bcrypt.compare(password, hashedPassword, (err, response) => { 
    response ? res.locals.message = 'Login successful' : res.locals.message = 'Login unsuccessful';
    next();
  })
}

module.exports = userController;