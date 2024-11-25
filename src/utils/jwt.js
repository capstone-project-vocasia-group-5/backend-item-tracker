const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config/config");

const customError = require("../errors");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  try {
    const result = jwt.verify(token, jwtSecret);
    if (!result) {
      throw new customError.UnauthenticatedError("failed to verify token");
    }
    return result;
  } catch (err) {
    if (err instanceof customError.UnauthenticatedError) {
      throw err;
    }
    throw new customError.UnauthenticatedError(
      "failed to verify token : " + err
    );
  }
};

module.exports = {
  createJWT,
  isTokenValid,
};
