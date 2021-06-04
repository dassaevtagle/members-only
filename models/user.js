const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, maxlength: 100, unique: true},
  hash: String,
  salt: String,
  userStatus: {
      type: String,
      enum: ['user', 'member'],
      default: 'user'
  },
  admin: Boolean
});

const User = mongoose.model('User', UserSchema);

module.exports = User;