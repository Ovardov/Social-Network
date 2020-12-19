// App Config
export const port = process.env.PORT || 3001;
export const dbURL = process.env.DB_URL;
export const authCookieName = process.env.Auth_Cookie_Name;
export const authCookieSecret = process.env.Auth_Cookie_Secret;
export const corsOrigin = process.env.CORS_Origin;

// Social Providers
export const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
  profileFields: ['email', 'name', 'picture.type(large)'],
};

export const googleConfig = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: process.env.GOOGLE_APP_CALLBACK_URL,
};

// Redirect From Social Login
export const clientLoginSuccessRedirectUrl = process.env.CLIENT_LOGIN_SUCCESS_REDIRECT_URL;
export const clientLoginFailureRedirectUrl = process.env.CLIENT_LOGIN_FAILURE_REDIRECT_URL;
