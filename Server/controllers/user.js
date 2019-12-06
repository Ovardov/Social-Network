const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
    get: (req, res, next) => {
        const { username, limit, name } = req.query;
        let query = {};

        if (username) {
            query = { username }
        }

        if (name) {
            query = { ...query, name: { $regex: name, $options: 'i' } };
        }

        if (limit) {
            models.User.find(query).populate('posts').limit(limit)
                .then((users) => res.send(users))
                .catch(next)
        } else {
            models.User.find(query).populate('posts')
                .then((users) => res.send(users))
                .catch(next)
        }
    },

    post: {
        register: (req, res, next) => {
            const { username, password, name } = req.body;

            models.User.create({ username, password, name })
                .then((createdUser) => {
                    res.send(createdUser);
                })
                .catch(err => {
                    err.code === 11000 ? res.status(401).send('Username is already taken!') : next(err)
                });
        },

        login: (req, res, next) => {
            const { username, password } = req.body;

            models.User.findOne({ username })
                .then((user) => !!user ? Promise.all([user, user.matchPassword(password)]) : [null, null])
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid username or password');
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    res.cookie(config.authCookieName, token).send(user);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];

            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        }
    },

    put: (req, res, next) => {
        const data = req.body;

        models.User.updateOne({ username: data.username }, data)
            .then((updatedUser) => res.send(updatedUser))
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;

        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};