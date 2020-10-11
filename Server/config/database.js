const mongoose = require('mongoose');
const config = require('./config');
mongoose.set('debug', true);


module.exports = () => {
  return mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
};