const { Schema, model } = require('mongoose');

const imageSchema = Schema({
  imageUrl: {
    type: String,
    required: true
  }
})

module.exports = new model('Image', imageSchema);