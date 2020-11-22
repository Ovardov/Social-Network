const config = {
  port: process.env.PORT || 3001,
  dbURL: process.env.DB_URL,
  authCookieName: process.env.Auth_Cookie_Name,
  authCookieSecret: process.env.Auth_Cookie_Secret,
  corsOrigin: process.env.CORS_Origin,
  facebookConfig: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
    profileFields: ['email', 'name', 'picture.type(large)']
  },
  clientSuccessUrl: process.env.CLIENT_SUCCESS_URL,
  clientFailureUrl: process.env.CLIENT_FAILURE_URL
};

module.exports = config;