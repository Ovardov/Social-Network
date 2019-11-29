const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3001,
        dbURL: 'mongodb://localhost:27017/social-network',
        authCookieName: 'auth-token'
    },
    production: {}
};

module.exports = config[env];