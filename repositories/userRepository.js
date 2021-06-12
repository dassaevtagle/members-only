const User = require('../models/user');

const createNewUser = (user) => {
  return new Promise((resolve, reject) => {

    const newUser = new User(user);

    newUser.save().then((user) => {
      resolve(user);
    }).catch((err) => {
      reject(err);
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({
        email: email
      })
      .then((user) => {

        if (!user) {
          reject("User not found");
        }

        resolve(user);

      }).catch((err) => {
        reject(err);
      })
  });
};


/** 
 * @param id string
 * @param update object with new user status
 * 
 */

const convertToMember = (id, update) => {
  return new Promise((resolve, reject) => {

    User.findOneAndUpdate(id, update, {
      new: true
    }).then((updatedUser) => {
      resolve(updatedUser);
    }).catch((err) => {
      reject(err);
    });

  });
}

module.exports = {
  createNewUser,
  getUserByEmail,
  convertToMember
}