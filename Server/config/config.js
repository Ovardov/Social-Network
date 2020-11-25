const config = {
  // App Config
  port: process.env.PORT || 3001,
  dbURL: process.env.DB_URL,
  authCookieName: process.env.Auth_Cookie_Name,
  authCookieSecret: process.env.Auth_Cookie_Secret,
  corsOrigin: process.env.CORS_Origin,

  // Social Providers
  facebookConfig: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
    profileFields: ['email', 'name', 'picture.type(large)']
  },
  googleConfig: {
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: process.env.GOOGLE_APP_CALLBACK_URL,
  },
  // Redirect From Social Login
  clientLoginSuccessRedirectUrl: process.env.CLIENT_LOGIN_SUCCESS_REDIRECT_URL,
  clientLoginFailureRedirectUrl: process.env.CLIENT_LOGIN_FAILURE_REDIRECT_URL
};

module.exports = config;