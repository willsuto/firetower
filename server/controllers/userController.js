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
    console.log(queryResponse)
  });
  res.locals.message = `Welcome, ${username}. Login to view your home page.`;
  return next();
}

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const text = `SELECT * FROM users WHERE username=($1)`;

  const params = [ username ]

  const queryResponse = await db.query(text, params);

  const user = queryResponse.rows[0];

  if (!user) {
    res.locals.user = `No user named ${username} found.`;
    next();
  }
  else {
    const hashedPassword = user.password;
    console.log('hashed password', hashedPassword)
    bcrypt.compare(password, hashedPassword, (err, response) => { 
      response ? res.locals.user = user : res.locals.user = 'Incorrect password';
      next();
    })
  }
}

// save existing user's modified data to db
userController.saveUserData = async (req, res, next) => {
  const { username, lat, lng, homeLocationSet } = req.body;
  const text = `UPDATE users SET home_lat=($1), home_long=($2), home_location_set=($3) WHERE username=($4)`;
  const params = [ lat, lng, homeLocationSet, username ];
  console.log('params', params)

  try {
    const queryResponse = await db.query(text, params);
    console.log('query response', queryResponse);
  } catch (error) { next(error) };

  next();
};

//add message to user profile in db
userController.addMessage = async (req, res, next) => {
  console.log(req.body);
  const { username, message } = req.body;
  const text = `UPDATE users SET message=($1) WHERE username=($2)`;
  const params = [message, username];
  
  try {
    const queryResponse = await db.query(text, params);
    console.log('queryResponse', queryResponse)
    next();
  } catch (error) { next(error) };


}


module.exports = userController;