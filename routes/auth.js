const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const  User  = require('../models/user');

const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

function createAuthToken (user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}
router.post('/login', localAuth, (req, res) => {
  console.log(req)
  const username = req.user.username
  console.log(username)
   User.findOne({username:username}, function(err, user, data) {
    
    if(err) res.send(err);
   });
  const authToken = createAuthToken(req.user);
 return res.json({ authToken });
});

module.exports = router;