const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const userController = require('./controllers/userController');
const firesController = require('./controllers/firesController');

const app = express();
const PORT = 3000;

//middleware for parsing JSON bodies
app.use(express.json());

//serve static files from the build directory
app.use(express.static('build'));

//signup handler
app.post('/api/signup',
  userController.checkDups,
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.user)
)

//login handler
app.post('/api/login', 
  userController.verifyUser,
  (req, res) => res.status(200).json(res.locals.user)
)

//logout handler
app.put('/api/logout',
  userController.saveUserData,
  (req, res) => res.status(200).send() 
)

//fires handler
app.get('/api/fires', 
  firesController.getFires, 
  firesController.storeFires,
  (req, res) => res.status(200).send()
)

//catch-route handler
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

//catch-all error handler
app.use((req, res) => res.status(404).send('!!Page not found!!'))

//global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred'}
  };
  const errorObj = Object.assign(defaultERr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status.json(errorObj.message));
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;