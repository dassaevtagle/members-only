var express = require('express');
var router = express.Router();
var auth = require('../lib/authMiddleware');
var msgRepository = require('../repositories/messageRepository');

/* GET home page. */
router.get('/', auth.userStatus, function(req, res, next) {
  const userStatus = res.locals.userStatus;

  msgRepository.getAllMessages()
    .then((messages)=>{
      const data = {
        title:  'Members Only',
        userStatus: userStatus,
        allMessages : messages, 
      }
    
      res.render('pages/index', data);
    })
    .catch((err)=>{
      next(err)
    });
});

module.exports = router;
