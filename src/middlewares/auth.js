const customError = require("../errors");
const { isTokenValid } = require("../utils");
const { User } = require("../models/user_model");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new customError.UnauthenticatedError("Authentication invalid");
    }

    const payload = isTokenValid({ token });

    const user = await User.findOne({ _id: payload.userId }).select("+role");

    if (!user) {
      throw new customError.UnauthenticatedError("Authentication invalid");
    }

    // Attach the user and his permissions to the req object
    req.user = {
      role: payload.role,
      id: payload.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
