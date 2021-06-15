const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;


function generatePassword(password){
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash
  }
}


/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */

function validatePassword (password, hash, salt) {
  var hashVerify =  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash == hashVerify;
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
 function issueJWT(user) {
  console.log(user);
  const _id = user._id;
  const status = user.userStatus;
  const isAdmin =  user.admin;
  const name = user.firstName;

  const expiresIn = '1w';
  const payload = {
    sub: _id,
    iat: Date.now(),
    status: status,
    admin: isAdmin,
    name: name,
  };


  const signedToken = jsonwebtoken.sign(payload, TOKEN_SECRET, { expiresIn: expiresIn });

  return signedToken;
}

module.exports.generatePassword = generatePassword;
module.exports.validatePassword =  validatePassword;
module.exports.issueJWT =  issueJWT;