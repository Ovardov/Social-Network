const { Schema, model } = require('mongoose');

const imageSchema = Schema({
  imageUrl: {
    type: String,
    required: true
  }
}, { versionKey: false });

module.exports = new model('Image', imageSchema);