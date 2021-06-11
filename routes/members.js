var express = require('express');
var router = express.Router();
var auth = require('../lib/authMiddleware');
const User = require('../models/user');
const utils = require('../lib/passwordUtils');
const { util } = require('webpack');

/* GET Member Page before real member conversion */
router.get('/pass', function(req, res, next){
      res.send(`
        <h5>Do some stuff</h5>
        <form action = "convert" method = "post">
            <button>Convert into member</button>
        <form>
      `);
});

/* PUT for member conversion */
router.post('/convert', auth.userStatus, async function(req, res, next){
  if(res.locals.isMember){
    console.log(`You are already a member!`);
    res.redirect('/')
  }
  if(!res.locals.isUser){
    console.log('You are not a user !!');
    return res.redirect('/users/signup');
  }

    const userId = { _id: res.locals.userId };
    const update = { userStatus: 'member'};

    User.findOneAndUpdate(userId, update, {new: true}).then((updatedUser) => {
      const newJwt = utils.issueJWT(updatedUser);
      res.clearCookie('jwt');
      res.cookie('jwt', newJwt)
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
      next(err);
    });

});

router.delete('/delete/:id', function(req, res, next){
  alert('Deleted from router');
  res.send(200);
});


module.exports = router;