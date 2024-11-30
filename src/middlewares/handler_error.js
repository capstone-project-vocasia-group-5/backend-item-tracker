const { StatusCodes } = require("http-status-codes");
const RES = require("../config/resMessage");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    success: err.success || RES.ERROR,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || RES.SOMETHING_WENT_WRONG,
    errors: err.errors || {},
  };

  if (err.name === "ValidationError") {
    customError.errors = Object.values(err.errors)
      .map((item) => item.errors)
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}); // Mengubah ke objek
    customError.statusCode = StatusCodes.BAD_REQUEST; // 400
    customError.message = RES.VALIDATION_ERROR;
  }

  if (err.code && err.code === 11000) {
    customError.errors = ` ${Object.keys(err.keyValue)} ${
      RES.ALREADY_EXISTS
    }, ${RES.PLEASE_CHOOSE} ${RES.ANOTHER} ${Object.keys(err.keyValue)} `;
    customError.statusCode = StatusCodes.CONFLICT; // 409
    customError.message = RES.DUPLICATE_VALUE;
  }

  if (err.name === "CastError") {
    console.log(err);
    customError.message = RES.FAILED;
    customError.errors = RES.DATA_IS_NOT_FOUND;
    customError.statusCode = StatusCodes.NOT_FOUND; // 404
  }

  return res.status(customError.statusCode).json({
    success: customError.success,
    message: customError.message,
    errors: customError.errors,
  });
};

module.exports = errorHandlerMiddleware;
