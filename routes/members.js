var express = require('express');
var router = express.Router();
var auth = require('../lib/authMiddleware');
const utils = require('../lib/passwordUtils');
const msgRepository = require('../repositories/messageRepository');
const userRepository = require('../repositories/userRepository');

/* GET Member Page before real member conversion */
router.get('/pricing', function(req, res, next){
      /* res.send(`
        <h5>Do some stuff</h5>
        <form action = "convert" method = "post">
            <button>Convert into member</button>
        <form>
      `); */
      res.render('pages/pricing');
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

  userRepository.convertToMember(userId, update)
    .then((updatedUser)=>{
      const newJwt = utils.issueJWT(updatedUser);
      res.clearCookie('jwt');
      res.cookie('jwt', newJwt)
      res.redirect('/');
    })
    .catch((err)=>{
      console.log(err);
      next(err);
    });
});

router.delete('/delete/:id', auth.userStatus, function(req, res, next){
  if (res.locals.isMember == false) res.sendStatus(401); 
  
  let id = req.params.id;

  msgRepository.deleteMessage(id)
    .then((msg)=>{
      console.log(msg)
      res.status(200).send(msg);
    })
    .catch((err)=>{
      res.status(500).send(err);
    });

});


module.exports = router;