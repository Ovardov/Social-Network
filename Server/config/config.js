const config = {
  port: process.env.PORT || 3001,
  dbURL: process.env.DB_URL,
  authCookieName: process.env.Auth_Cookie_Name,
  authCookieSecret: process.env.Auth_Cookie_Secret,
  corsOrigin: process.env.CORS_Origin
};

module.exports = config;