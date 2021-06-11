var express = require('express');
var router = express.Router();
var auth = require('../lib/authMiddleware');
var msg = require('../lib/msgMiddleware');

/* GET home page. */
router.get('/', auth.userStatus, msg.getMessages, function(req, res, next) {
  const userStatus = res.locals.userStatus;
  const allMessages = res.locals.allMessages
  
  const data = {
    title:  'Members Only',
    userStatus: userStatus,
    allMessages : allMessages, 
  }

  res.render('pages/index', data);
});

module.exports = router;
