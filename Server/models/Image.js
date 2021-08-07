const { Schema, model } = require('mongoose');

const imageSchema = Schema({
  imageUrl: {
    type: String,
    required: true
  }
});

imageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

imageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('Image', imageSchema);