const Message = require('../models/message');
const User = require('../models/user');

const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    Message.find({}, (err, msgs) => {
      if (err) reject(err);
      resolve(msgs);
    });
  });
};

const createMessage = (message, userId) => {

  let newMessage = new Message(message);

  return new Promise((resolve, reject) => {
    newMessage.save().then((message) => {
      User.findByIdAndUpdate({
          _id: userId
        }, {
          $push: {
            messages: {
              _id: message._id
            }
          }
        },
        function (err, user) {

          if (err) {
            reject(err);
          } else {
            resolve(message);
          }

        });
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    Message.findByIdAndDelete(id)
      .then((msg) => {
        if (!msg) {
          reject("Message not found");
        }
        resolve(msg);
      })
      .catch((error) => {
        reject(error)
      });
  })
}

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage
}