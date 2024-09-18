const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/users.model');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const response = await userModel.getUserByEmail(username);
        if (!response) {
          return done(null, false);
        }

        if (response.hasError) {
          return done(null, false);
        }

        if (response.data.password != password) {
          return done(null, false);
        }
        
        return done(null, response.data);
      } catch (error) {
        return done(error);
      }
    })
  );
}