const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 * Appends to the reques object isUSer and userStatus properties
 * req.isUser = boolean
 * req.userStatus = null || string
*/
module.exports.userStatus = (req, res, next) => {
  req.userId = null;
  req.isUser = false;
  req.isMember = false;
  req.isAdmin = false;
  req.userStatus = null;
  const token = req.cookies['jwt'];

  if( token != undefined){

    try {
      // In case of invalid token it gets an error; 
      var jwtDecoded = jwt.verify(token, TOKEN_SECRET);
      
      switch(jwtDecoded.status) {
        case 'user':
          req.isUser =  true;
          req.userId = jwtDecoded.sub;
          console.log('hi!');
          break;
        case 'member':
          req.isUser =  true;
          req.isMember = true;
          req.userId = jwtDecoded.sub;
          break;
        default:
          break;
      }

      if(jwtDecoded.admin){
        req.isAdmin = true;
        req.userId = jwtDecoded.sub;
      }
      req.userStatus = jwtDecoded.status;
      next();

    } catch(err) {
      console.log(err);  
      next(err);
    }
  } else {
    next();
  }
}
