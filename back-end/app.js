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
const users = require('./accountData');

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
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ success: false, message: `no username or password supplied.` });
    }

    // usually this would be a database call, but here we look for a matching user in our mock data
    const user = users.find((o) => o.email === email);

    if (!user) {
      // no user found with this name... send an error
      res.status(401).json({ success: false, message: `user not found: ${email}.` });
    } else if (req.body.password === user.password) {
      res.status(200).json(user);
    } else {
      // the password did not match
      res.status(401).json({ success: false, message: 'passwords did not match' });
    }
  }
);

app.post('/createaccount', (req, res) => {
  const user = req.body;

  res.status(200).json(user);
});

module.exports = app;
