const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email is already taken!'],
    required: true
  },
  username: {
    type: String,
    unique: [true, 'Username is already taken!'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  about: String,
  work: String,
  education: String,
  home: String,
  relationshipStatus: String,
  profilePicture: {
    type: 'ObjectId',
    ref: 'Image'
  },
  coverPicture: {
    type: 'ObjectId',
    ref: 'Image'
  },
  posts: [{
    type: 'ObjectId',
    ref: 'Post'
  }],
  friends: [{
    type: 'ObjectId',
    ref: 'User'
  }],
}, { versionKey: false});

userSchema.index({
  email: 1,
  username: 1
}, { unique: true });

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  }
};

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);

          return;
        }

        this.password = hash;
        next();
      });
    });

    return;
  }

  next();
});

module.exports = new model('User', userSchema);