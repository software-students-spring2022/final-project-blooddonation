#!/usr/bin/env node
/* eslint-disable no-console */
const server = require('./app');
// load up the web server
const port = 3000; // the port to listen to for incoming requests
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/User');
const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Passport Local Strategy
passport.use(new LocalStrategy(
  // function of username, password, done(callback)
  function(username, password, done) {
    // look for the user data
    User.findOne({ username: username }, function (err, user) {
      // if there is an error
      if (err) { return done(err); }
      // if user doesn't exist
      if (!user) { return done(null, false, { message: 'User not found.' }); }
      // if the password isn't correct
      if (!user.verifyPassword(password)) { return done(null, false, {   
      message: 'Invalid password.' }); }
      // if the user is properly authenticated
      return done(null, user);
    });
  }
));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/createaccount' }),  function(req, res) {
	console.log(req.user)
  //to do: redirect to unique dashboard / profile page
	res.redirect('./dashboard');
});

app.post('/createaccount', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
});

app.listen(port, () => console.log(`This app is listening on port ${port}`));

// module.exports = {
//   close,
// };
