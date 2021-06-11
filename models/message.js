const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timestamp: { type: Number, required: true },
  timezone: {type: Number, required: true},
  text:{ type: String, required: true },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;