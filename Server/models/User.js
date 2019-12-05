const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        unique: [true, 'Username is already taken!'],
        required: true
    },

    password: {
        type: Schema.Types.String,
        required: true
    },

    name: {
        type: Schema.Types.String,
        required: true,
    },

    profilePicture: {
        type: Schema.Types.String,
        default: 'https://res.cloudinary.com/dxxq5xtsy/image/upload/v1575099159/tjtegxh6a0adt5rwea9u.png'
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

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