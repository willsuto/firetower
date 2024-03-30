const bcrypt = require('bcryptjs');
const db = require('../dbModel');

const userController = {};

userController.checkDups = async (req, res, next) => {
  const queryResult = await db.query('SELECT username FROM users');
  const rows = queryResult.rows;
  const usernames = rows.map(row => row.username);
  usernames.forEach(name => {
    if (req.body.username === name) {
      console.log('Username already exists')
      return res.status(200).json('User already exists');
    }
    else { next() };
  })
}

userController.createUser = (req, res, next) => {

  const { username, password } = req.body;
  
  bcrypt.hash(password, 10, (err, hash) => {
    const text = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    const params = [ username, hash ];
    db.query( text, params);
  });
  console.log('signed up?')
  return next();
}

module.exports = userController;