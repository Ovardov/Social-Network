const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({

    username: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },

    password: {
        type: Schema.Types.String,
        required: true
    }
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