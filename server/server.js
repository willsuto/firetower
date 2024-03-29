const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//middleware for parsing JSON bodies
app.use(express.json());

//serve static files from the build directory
app.use(express.static('build'));

//test route
app.get('/api/test', (req, res) => {
  console.log('endpoint triggered')
  res.status(200).json({ message: 'Server is running'})
})

app.get('api/app', (req, res) => {
  res.status(200).json('app')
})

// app.get('/api/app', (req, res) => {
//   res.redirect()
// })

//catch-all route handler
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