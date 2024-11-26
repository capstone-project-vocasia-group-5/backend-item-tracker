const customError = require("../errors");
const { isTokenValid } = require("../utils");

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

    // Attach the user and his permissions to the req object
    req.user = {
      role: payload.role,
      id: payload.id,
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
