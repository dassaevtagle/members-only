var express = require('express');
var router = express.Router();
var auth = require('../lib/authMiddleware');
const User = require('../models/user');

/* GET Member Page before real member conversion */
router.get('/pass', function(req, res, next){
      res.send(`
        <h5>Do some stuff</h5>
        <form action = "convert" method = "post">
            <button>Convert into member</button>
        <form>
      `);
});

/* POST for member conversion */
router.post('/convert', auth.userStatus, function(req, res, next){
  console.log(req.isUser);
  if(req.isMember){
    console.log(`You are already a member!`);
    res.redirect('/')
  }
  if(!req.isUser){
    console.log('You are not a user !!');
    return res.redirect('/users/signup');
  }

  User.findByIdAndUpdate(
    { _id: req.userId },
    { userStatus: 'member'},
    function (err, user) {
    
      if (err) {
        res.send(err);
      } else {
        res.redirect('/');
      }

  });
  
});

module.exports = router;