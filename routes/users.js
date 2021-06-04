var express = require('express');
const { util } = require('webpack');
var router = express.Router();
const utils = require('../lib/passwordUtils');
const User = require('../models/user');
const passport = require('passport')


/* GET Sign up page */
router.get('/signup', function(req, res, next){
  res.render('pages/signup');
});

/* POST SIGN UP ROUTE */
router.post('/signup', (req, res, next) => {
    const saltHash = utils.generatePassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;



    const newUser = new User({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      hash: hash,
      salt: salt,
      admin: false
    });


    newUser.save().then((user) => {

        const jwt = utils.issueJWT(user);

        res.cookie('jwt', jwt);
        res.redirect('/')
    }).catch((err) => {
      console.log(err);  
      next(err);
  });
});

/* GET Login page */
router.get('/login', function(req, res, next){
  res.render('pages/login');
});

/* POST LOGIN ROUTE */
router.post('/login', (req, res, next) => {
    
    User.findOne({ email: req.body.email })
        .then((user) => {

          if(!user) {
            return res.status(401).json({ success: false, msg: "User not found." });
          }

          const isValidPassword = utils.validatePassword(req.body.password, user.hash, user.salt);
          
          if(isValidPassword) {
            const jwt = utils.issueJWT(user);
            /* Set a cookie with the token */
            res.cookie('jwt', jwt);
            res.status(200).json({ success: true, token: jwt });

          } else {
            res.status(401).json({ success: false, msg: "Invalid credentials." });
          }

        }).catch((err) => {
          next(err);
        })
 
});

router.get('/protected', passport.authenticate('jwt', {session: false }), (req, res, next) => {
  res.send('<h5>You made it to the protected route. Yay!</h5>')
});


module.exports = router;