var express = require('express');
var router = express.Router();
const utils = require('../lib/passwordUtils');
const msgRepository = require('../repositories/messageRepository');
const userRepository = require('../repositories/userRepository');


router.get('/convertToAdmin', function(req, res, next){
  res.send(`
    <h5>Do some stuff</h5>
    <form action = "payment/admin" method = "post">
        <button>Convert into admin</button>
    </form>
  `);
});

/* GET pricings */
router.get('/pricing', function(req, res, next){
      console.log('We got to pricing router');
      res.render('pages/pricing');
});

/* PUT for member conversion */
router.post('/payment/member', async function(req, res, next){
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

router.post('/payment/admin', async function(req, res, next){
  if(res.locals.isAdmin){
    console.log(`You are already an admin!`);
    res.redirect('/')
  }
  if(!res.locals.isUser){
    console.log('You are not a user !!');
    return res.redirect('/users/signup');
  }

  const userId = { _id: res.locals.userId };
  const update = { admin: true};

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

router.delete('/delete/:id', function(req, res, next){
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