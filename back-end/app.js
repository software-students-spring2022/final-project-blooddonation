#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config({ silent: true });
// load up the web server

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(passport.initialize());
const { jwtOptions, jwtStrategy } = require('./jwt-config');
// import setup options for using JWT in passport
passport.use(jwtStrategy);

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then((data) => console.log(`Connected to MongoDB`))
  .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

const { User } = require('./models/User');
const eligibilityQuestionnaire = require('./quizQuestions/EligibilityQuestionnaireData');
const WholeBloodQuestions = require('./quizQuestions/WholeBloodQuestions');
const PowerRedQuestions = require('./quizQuestions/PowerRedQuestions');
const PlateletQuestions = require('./quizQuestions/PlateletQuestions');
const PlasmaQuestions = require('./quizQuestions/PlasmaQuestions');
const questions = require('./quizQuestions/questions');
const FAQData = require('./pageData/FAQData');
const GeneralHealthData = require('./pageData/GeneralHealthData');
const LifestyleData = require('./pageData/LifestyleData');
const MedicalCondData = require('./pageData/MedicalCondData');
const MedicalTreatData = require('./pageData/MedicalTreatData');
const MedicationData = require('./pageData/MedicationData');
const STDData = require('./pageData/STDData');
const TravelData = require('./pageData/TravelData');

// a route to handle logging out users
app.get('/logout', (req, res) => {
  // nothing really to do here... logging out with JWT authentication is handled entirely by the front-end by deleting the token from the browser's memory
  res.json({
    success: true,
    message:
      "There is actually nothing to do on the server side... you simply need to delete your token from the browser's local storage!",
  });
});

app.post(
  '/login',
  // passport.authenticate('local', { failureRedirect: '/createaccount' }),
  async (req, res) => {
    // grab the name and password that were submitted as POST body data
    const { email, password } = req.body;
    // console.log(`${username}, ${password}`)
    if (!email || !password) {
      // no username or password received in the POST body... send an error
      res.status(401).json({ success: false, message: `no username or password supplied.` });
    }

    // usually this would be a database call, but here we look for a matching user in our mock data
    // const user = users[_.findIndex(users, { email: email })];
    // const test = await User.findOne({}).exec();
    const user = await User.findOne({ email }).exec();
    // console.log(user);
    // console.log(test);
    if (!user) {
      // no user found with this name... send an error
      res.status(401).json({ success: false, message: `user not found: ${email}.` });
    }

    // assuming we found the user, check the password is correct
    // we would normally encrypt the password the user submitted to check it against an encrypted copy of the user's password we keep in the database... but here we just compare two plain text versions for simplicity
    else if (bycrpt.compareSync(req.body.password, user.password)) {
      // else if (req.body.password === user.password) {
      // the password the user entered matches the password in our "database" (mock data in this case)
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      const payload = { id: user.id }; // some data we'll encode into the token
      const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
      res.json({ success: true, email: user.email, token }); // send the token to the client to store
    } else {
      // the password did not match
      res.status(401).json({ success: false, message: 'passwords did not match' });
    }
  }
);

app.post('/createaccount', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (!existingUser) {
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        eligible: [],
      });
      const payload = { id: user.id }; // some data we'll encode into the token
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.json({ success: true, email: user.email, token });
    }

    return res.status(401).json({ success: false, message: 'That email already has an account' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save user to the database',
    });
  }
});

app.get(
  '/createaccount/eligibilityquestionnaire',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const user = req.body;

    // res.status(200).json(user);
    // console.log(req.body);

    try {
      const EligibilityQuestionnaireData = eligibilityQuestionnaire;
      return res.json({
        EligibilityQuestionnaireData,
        user: {
          id: req.user.id,
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          age: req.user.age,
          eligible: req.user.eligible,
        },
        status: 'all good',
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: err,
        status: 'failed to save user to the database',
      });
    }
  }
);

// TODO
app.post('/createaccount/eligibilityquestionnaire', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.userID },
      { eligible: req.body.eligible }
    ).exec();

    return res.json({ success: true, updated: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save user to the database',
    });
  }
});

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  // our jwt passport config will send error responses to unauthenticated users will
  // so we only need to worry about sending data to properly authenticated users!

  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      eligible: req.user.eligible,
    },
    message: 'Congratulations: you have accessed this route because you have a valid JWT token!',
  });
});

app.get('/finddonationsite', async (req, res) => {
  // const user = req.body;

  // res.status(200).json(user);
  // console.log(req.body);

  try {
    return res.json({
      WholeBloodQuestions,
      PowerRedQuestions,
      PlateletQuestions,
      PlasmaQuestions,
      questions,
      // return the message we just saved
      status: 'all good',
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save user to the database',
    });
  }
});

app.get('/FAQ', async (req, res) => {
  // const user = req.body;

  // res.status(200).json(user);
  // console.log(req.body);

  try {
    return res.json({
      FAQData,

      // return the message we just saved
      status: 'all good',
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save user to the database',
    });
  }
});

app.get('/FAQ/eligibility', async (req, res) => {
  // const user = req.body;

  // res.status(200).json(user);
  // console.log(req.body);

  try {
    return res.json({
      GeneralHealthData,
      LifestyleData,
      MedicalCondData,
      MedicalTreatData,
      MedicationData,
      STDData,
      TravelData,

      // return the message we just saved
      status: 'all good',
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save user to the database',
    });
  }
});

module.exports = app;
