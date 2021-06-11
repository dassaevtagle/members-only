const Message =  require('../models/message');

const getMessages = (req, res, next) => {
  
  res.locals.allMessages = null;
  
  try{
    Message.find({}, (err, msgs)=>{
        if (err) next(err);

        res.locals.allMessages = msgs;
        next();
    });
  } catch(err){
    next(err)
  }
}

module.exports.getMessages = getMessages;