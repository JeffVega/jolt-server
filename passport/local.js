const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
  const User = require('../models/user');
  const bcrypt = require('bcrypt');

const localStrategy = new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, async function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      let vaildPass = await bcrypt.compare(password,user.password)
      if (!vaildPass) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
);

module.exports = localStrategy