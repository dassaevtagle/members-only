const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timestamp: { type: String, required: true },
  text:{ type: String, required: true },
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;