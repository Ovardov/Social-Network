const { Schema, model } = require('mongoose');

const interestSchema = new Schema({
  name: ({
    type: String,
    required: true,
    unique: true,
  }),
  users: [{
    type: 'ObjectId',
    ref: 'User',
    required: true
  }]
});

interestSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

interestSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('Interest', interestSchema);