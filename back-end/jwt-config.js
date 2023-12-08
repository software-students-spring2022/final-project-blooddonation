require('dotenv').config({ silent: true }); // load environmental variables from a hidden file named .env
// const mongoose = require('mongoose');
const passportJWT = require('passport-jwt');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;
const { User } = require('./models/User');

// set up some JWT authentication options
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt'); // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET || "testing_key_nedded"; // an arbitrary string used during encryption - see the .env file
// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly
// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use
// eslint-disable-next-line camelcase
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  console.log('JWT payload received', jwt_payload); // debugging

  // load up some mock user data in an array... we only need this because we're mocking the data from a database

  // try to find a matching user in our "database"
  // usually we would do this by finding matching records in a real database... here we're searching the hard-coded mock data in our 'user_data.js' file
  // eslint-disable-next-line camelcase
  // const user = users[_.findIndex(users, { id: jwt_payload.id })]; // find a matching user using a convenient lodash function... we would normally look this user up in a real database
  // eslint-disable-next-line camelcase

  // eslint-disable-next-line camelcase
  const user = await User.findOne({ _id: jwt_payload.id }).exec();
  if (user) {
    // we found the user... keep going
    next(null, user);
  } else {
    // we didn't find the user... fail!
    next(null, false);
  }
});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
