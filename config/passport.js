const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};
const options = {
  //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  jwtFromRequest: cookieExtractor,
  secretOrKey: TOKEN_SECRET
};

const strategy = new JwtStrategy(options, (payload, done) => {
      
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({_id: payload.sub}, function(err, user) {
          
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
          }
          
      });
}); 

  

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(strategy);
}