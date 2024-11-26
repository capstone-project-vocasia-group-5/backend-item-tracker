const RES = require("../config/resMessage");
const CFG = require("../config/const");
const customError = require("../errors");
const { User, validateUser } = require("../models/user_model");
const { createJWT, createTokenUser } = require("../utils");

const signUp = async (req, res, next) => {
  const { name, username, email, phone_number, password } = req.body;

  try {
    const { error } = validateUser.create(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const user = await User.create({
      username,
      name,
      email,
      phone_number,
      password,
    });

    if (!user) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG
      );
    }

    res.status(201).json({
      success: RES.SUCCESS,
      message: RES.SIGN_UP_SUCCESS,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signInCMS = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { error } = validateUser.login(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const user = await User.findOne({
      email,
      deleted_at: null,
      is_verified: true,
      role: CFG.ROLES.ADMIN,
    }).select("+password");
    if (!user) {
      throw new customError.UnauthorizedError(
        RES.UNAUTHORIZED_ERROR,
        RES.CREDENTIAL_IS_WRONG
      );
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new customError.UnauthorizedError(
        RES.UNAUTHORIZED_ERROR,
        RES.CREDENTIAL_IS_WRONG
      );
    }

    const token = createJWT({ payload: createTokenUser(user) });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SIGN_IN_SUCCESS,
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { error } = validateUser.login(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const user = await User.findOne({
      email,
      deleted_at: null,
      is_verified: true,
      role: CFG.ROLES.USER,
    }).select("+password");
    if (!user) {
      throw new customError.UnauthorizedError(
        RES.UNAUTHORIZED_ERROR,
        RES.CREDENTIAL_IS_WRONG
      );
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new customError.UnauthorizedError(
        RES.UNAUTHORIZED_ERROR,
        RES.CREDENTIAL_IS_WRONG
      );
    }

    const token = createJWT({ payload: createTokenUser(user) });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SIGN_IN_SUCCESS,
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const authenticateOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const { error } = validateUser.otp(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const user = await User.findOne({
      email,
      deleted_at: null,
    }).select("+otp +otp_expires_at +otp_status");

    if (!user) {
      throw new customError.NotFoundError(
        RES.NOT_FOUND,
        RES.YOUR_EMAIL_DOES_NOT_MATCH_WITH_ANY_ACCOUNT
      );
    }

    if (user.otp !== otp) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        RES.INVALID_OTP
      );
    }

    if (user.otp_expires_at < Date.now()) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        RES.YOUR_OTP_IS_EXPIRED
      );
    }

    if (!user.is_verified) {
      user.is_verified = true;
    }

    user.otp = null;
    user.otp_expires_at = null;
    user.otp_status = false;
    await user.save();

    const token = createJWT({ payload: createTokenUser(user) });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.OTP_VERIFICATION_SUCCESS,
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const sendOTP = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        RES.EMAIL_IS_REQUIRED
      );
    }
    const { error } = validateUser.forgotPassword(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const user = await User.findOne({
      email,
      deleted_at: null,
    });

    if (!user) {
      throw new customError.NotFoundError(
        RES.NOT_FOUND,
        RES.YOUR_EMAIL_DOES_NOT_MATCH_WITH_ANY_ACCOUNT
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otp_expires_at = otpExpiresAt;
    user.otp_status = false;
    await user.save();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SEND_OTP_SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  signInCMS,
  authenticateOTP,
  forgotPassword,
  sendOTP,
};
