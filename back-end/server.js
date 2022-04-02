#!/usr/bin/env node
/* eslint-disable no-console */
const server = require('./app');
// load up the web server
const port = process.env.port || 3000; // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, () => {
  //console.log(`Server running on port: ${port}`);
});
// a function to stop listening to the port
const close = () => {
  listener.close();
};

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome' });
});

server.post('/register', (req, res) => {
  const user = {
    firstName: "Rachel",
    lastName: "Kindagen",
    email: "rmk461@nyu.edu",
    password: "helloworld123",
    age: 21,
    eligible: [],
    loggedIn: false,
  }
  res.status(200).json(user);
});

server.post('/login', (req, res) => {
  const data = {
    email: 'rmk461@nyu.edu',
    password: 'helloworld123'
  }

  if (req.body.email === data.email && req.body.password === data.password) {
    res.status(200).json(data);
  }
  res.status(401).json({ message: 'Unauthorized' });

});

module.exports = {
  close,
};
module.exports = server;
