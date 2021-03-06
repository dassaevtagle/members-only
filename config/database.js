const mongoose = require('mongoose');

require('dotenv').config();

const dbStr = process.env.DB_STRING;

const connection = mongoose.connect(dbStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connection;