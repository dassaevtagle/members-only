var express = require('express');
var router = express.Router();
var auth = require('../lib/authMiddleware');

/* GET home page. */
router.get('/', auth.userStatus, function(req, res, next) {
  const isUser = req.isUser;
  const userStatus = req.userStatus;
  
  const info = {
    title:  'Members Only',
    userStatus: userStatus,
    isUser : isUser,
  }

  res.render('pages/index', info);
});

module.exports = router;
