const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = process.env.PASSWORD_SALT_ROUNDS
const { passwordRegex } = require('../utils/regex')

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email is already taken!'],
      required: true,
    },
    username: {
      type: String,
      unique: [true, 'Username is already taken!'],
    },
    password: {
      type: String,
      validate: {
        validator: (value) => passwordRegex.test(value),
        message:
          'Password must have minimum eight characters, at least one letter and one number',
      },
    },
    providers: [
      {
        type: String,
        enum: ['email', 'facebook', 'google'],
        required: true,
      },
    ],
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
      ref: 'Image',
    },
    coverPicture: {
      type: 'ObjectId',
      ref: 'Image',
    },
    posts: [
      {
        type: 'ObjectId',
        ref: 'Post',
      },
    ],
    friends: [
      {
        type: 'ObjectId',
        ref: 'User',
      },
    ],
  },
);

// Indexes
userSchema.index(
  {
    email: 1,
    username: 1,
  },
  { unique: true }
);

// Virtual fields
userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Compare password method
userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
}

// Hash password before create user
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(+saltRounds, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);

          return;
        }

        this.password = hash;
        next();
      })
    })

    return;
  }

  next();
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('User', userSchema)
