const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 * Appends to the reques object isUSer and userStatus properties
 * req.isUser = boolean
 * req.userStatus = null || string
*/
const userStatus = (req, res, next) => {
  res.locals.dummyText = "This is some dummy text";
  res.locals.userId = null;
  res.locals.isUser = false;
  res.locals.isMember = false;
  res.locals.isAdmin = false;
  res.locals.userStatus = null;
  res.locals.name = null;

  const token = req.cookies['jwt'];

  if( token != undefined){

    try {
      // In case of invalid token it gets an error; 
      var jwtDecoded = jwt.verify(token, TOKEN_SECRET);
      
      switch(jwtDecoded.status) {
        case 'user':
          res.locals.isUser =  true;
          res.locals.userId = jwtDecoded.sub;
          res.locals.name = jwtDecoded.name;
          break;
        case 'member':
          res.locals.isUser =  true;
          res.locals.isMember = true;
          res.locals.userId = jwtDecoded.sub;
          res.locals.name = jwtDecoded.name;
          break;
        default:
          break;
      }

      if(jwtDecoded.admin){
        res.locals.isAdmin = true;
        res.locals.userId = jwtDecoded.sub;
      }
      res.locals.userStatus = jwtDecoded.status;
      next();

    } catch(err) {
      console.log(err);  
      next(err);
    }
  } else {
    next();
  }
}


module.exports.userStatus = userStatus;