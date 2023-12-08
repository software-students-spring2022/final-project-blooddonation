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

// const morgan = require('morgan')

const app = express();
app.use(cors());
// app.options('*', cors());
// app.use(morgan('tiny'));

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
const { faqData } = require('./models/FAQData');
const { generalhealthData } = require('./models/GeneralHealthData');
const { lifestyleData } = require('./models/LifestyleData');
const { medicalcondData } = require('./models/MedicalCondData');
const { medicaltreatData } = require('./models/MedicalTreatData');
const { medicationData } = require('./models/MedicationData');
const { travelData } = require('./models/TravelData');
const { stdData } = require('./models/STDData');
const { eligibilityquestionnaireData } = require('./models/EligibilityQuestionnaireData');
const { wholebloodquestions } = require('./models/WholeBloodQuestions');
const { powerredquestions } = require('./models/PowerRedQuestions');
const { plateletquestions } = require('./models/PlateletQuestions');
const { plasmaquestions } = require('./models/PlasmaQuestions');
const { donationcenter } = require('./models/DonationCenters');
const { Questions } = require('./models/questions');

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

const inital_data = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: 0,
};

app.post('/editprofile/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
      }
    );
    

    return res.json({ success: true, updated: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save user to database',
    });
  }
});

app.get(
  '/createaccount/eligibilityquestionnaire',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const getQuestionnaire = await eligibilityquestionnaireData
        .find({}, { _id: 0, data: 1 })
        .exec();
      const temp = getQuestionnaire[0];
      const EligibilityQuestionnaireData = temp.data;

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
  let getData = await wholebloodquestions.find({}, { _id: 0, data: 1 }).exec();
  let temp = getData[0];
  const WholeBloodQuestions = temp.data;

  getData = await powerredquestions.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const PowerRedQuestions = temp.data;

  getData = await plateletquestions.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const PlateletQuestions = temp.data;

  getData = await plasmaquestions.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const PlasmaQuestions = temp.data;

  getData = await Questions.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const questions = temp.data;

  getData = await donationcenter.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const donationCenters = temp.data;

  try {
    return res.json({
      WholeBloodQuestions,
      PowerRedQuestions,
      PlateletQuestions,
      PlasmaQuestions,
      questions,
      donationCenters,
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

app.post('/createaccount/finddonationsite', async (req, res) => {
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

app.get('/FAQ', async (req, res) => {
  // const user = req.body;

  // res.status(200).json(user);
  // console.log(req.body);

  try {
    const getFAQ = await faqData.find({}, { _id: 0, data: 1 }).exec();
    const temp = getFAQ[0];
    // console.log(temp.data);
    const FAQData = temp.data;
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
  let getData = await generalhealthData.find({}, { _id: 0, data: 1 }).exec();
  let temp = getData[0];
  const GeneralHealthData = temp.data;

  getData = await medicalcondData.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const MedicalCondData = temp.data;

  getData = await lifestyleData.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const LifestyleData = temp.data;

  getData = await medicaltreatData.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const MedicalTreatData = temp.data;

  getData = await medicationData.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const MedicationData = temp.data;

  getData = await stdData.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const STDData = temp.data;

  getData = await travelData.find({}, { _id: 0, data: 1 }).exec();
  // eslint-disable-next-line prefer-destructuring
  temp = getData[0];
  const TravelData = temp.data;

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
