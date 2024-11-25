require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  urlDb: process.env.MONGODB_URI,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
  isProduction: process.env.IS_PRODUCTION,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
};
