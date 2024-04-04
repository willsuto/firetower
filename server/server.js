const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const userController = require('./controllers/userController');
const firesController = require('./controllers/firesController');
const neighborsController = require('./controllers/neighborsController');
// const bodyParser = require('body-parser');
const cors = require('cors');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js')

const app = express();
const PORT = 3000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(cors());

//middleware for parsing JSON bodies
app.use(express.json());

//serve static files from the build directory
app.use(express.static('build'));

//signup handler
app.post('/api/signup',
  userController.checkDups,
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.message)
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

//fetch fires and save to db handler
app.get('/api/fires', 
  firesController.getFires, 
  firesController.storeFires,
  (req, res) => res.status(200).send()
)

//add demofire
app.post('/api/demoFire',
  firesController.insertDemoFire,
  firesController.queryFires,
  (req, res) => res.status(200).json(res.locals.firesArray)
)

//send fires to client
app.get('/api/getFiresState',
  firesController.queryFires,
  (req, res) => res.status(200).json(res.locals.firesArray)
)

//send neighbors to client
app.post('/api/neighbors',
  neighborsController.getNeighbors,
  (req, res) => res.status(200).json(res.locals.neighbors)
)

//add message to user profile
app.put('/api/message',
  userController.addMessage,
  (req, res) => res.status(200).json(res.locals.message)
)

//delete message from user profile
app.delete('/api/deleteMessage',
  userController.deleteMessage,
  (req, res) => res.status(200).json('Message deleted')
)

// let clients = [];
// //SSE test
// app.get('/api/events', (req, res) => {
//   const headers = {
//     'Content-Type': 'text/event-stream',
//     'Connection': 'keep-alive',
//     'Cache-Control': 'no-cache'
//   };
//   res.writeHead(200, headers);

//   const data = `data: ${JSON.stringify(new Date().toLocaleTimeString())}\n\n`;

//   res.write(data);

//    // Function to send SSE messages at regular intervals
//    const sendSSEMessage = () => {
//     const data = `data: ${JSON.stringify(new Date().toLocaleTimeString())}\n\n`;
//     res.write(data);
//   };

//   // Send SSE messages every five seconds
//   const intervalId = setInterval(sendSSEMessage, 5000);

//   const clientId = Date.now();

//   const newClient = {
//     id: clientId,
//     res
//   };

//   clients.push(newClient);

//   console.log(`Connected with ${clientId}`);

//   // Listen for the client closing the connection and stop sending messages
//   req.on('close', () => {
//     clearInterval(intervalId);
//     console.log('Connection closed');
//     console.log(`${clientId} Connection closed`);
//     clients = clients.filter(client => client.id !== clientId);
//   });

//   // const intervalId = setInterval(() => {
//   //   const message = `data: ${new Date().toLocaleTimeString()}\n\n`
//   //   res.write(message);
//   // }, 5000);

//   // req.on('close', () => {
//   //   clearInterval(intervalId);
//   //   res.end();
//   // });
// })

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