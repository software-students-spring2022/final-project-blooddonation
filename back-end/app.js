#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config({ silent: true });
// load up the web server

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

const passport = require('passport');
const LocalStrategy = require('passport-local');

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then((data) => console.log(`Connected to MongoDB`))
  .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

const User = require('./models/User');

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    // function of username, password, done(callback)
    (username, password, done) => {
      // look for the user data
      User.findOne({ username }, (err, user) => {
        // if there is an error
        if (err) {
          return done(err);
        }
        // if user doesn't exist
        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }
        // if the password isn't correct
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: 'Invalid password.',
          });
        }
        // if the user is properly authenticated
        return done(null, user);
      });
    }
  )
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.post(
  '/login',
  // passport.authenticate('local', { failureRedirect: '/createaccount' }),
  (req, res) => {
    console.log(req.user);
    // to do: redirect to unique dashboard / profile page
    // res.redirect('./dashboard');
    const user = req.body;
    res.status(200).json(user);
  }
);

app.post('/createaccount', (req, res) => {
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  // let email = req.body.email;
  // let password = req.body.password;

  const user = req.body;

  res.status(200).json(user);
});

module.exports = app;

// module.exports = {
//   close,
// };
