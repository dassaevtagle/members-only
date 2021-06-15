var express = require('express');
var router = express.Router();
var msgRepository = require('../repositories/messageRepository');

/* GET home page. */
router.get('/', function(req, res, next) {
  const userStatus = res.locals.userStatus;
  const isAdmin = res.locals.isAdmin;
  const name = res.locals.name;

  msgRepository.getAllMessages()
    .then((messages)=>{
      const data = {
        title:  'Members Only',
        userStatus: userStatus,
        allMessages : messages,
        isAdmin: isAdmin,
        fullName: name,
      }
    
      res.render('pages/index', data);
    })
    .catch((err)=>{
      next(err)
    });
});

module.exports = router;
