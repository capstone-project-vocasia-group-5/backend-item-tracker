const RES = require("../config/resMessage");
const customError = require("../errors");
const { User, validateUser } = require("../models/user_model");
const cloudinaryServices = require("../services/cloudinary");
const fs = require("fs-extra");
const CFG = require("../config/const");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id, deleted_at: null });
    if (!user) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsersCMS = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const validatedPage = Math.max(Number(page), 1);
    const validatedLimit = Math.max(Number(limit), 1);

    const skip = (validatedPage - 1) * validatedLimit;

    const query = {
      deleted_at: null,
      is_verified: true,
      role: CFG.ROLES.USER,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } },
      ],
    };

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (!users || users.length === 0) {
      throw new customError.NotFoundError(
        RES.NOT_FOUND,
        RES.USERS_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        users,
        pagination: {
          total: totalUsers,
          page: Number(page),
          limit: Number(limit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, username, email, password, phone_number } = req.body;
  try {
    const { error } = validateUser.update(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }
    const user = await User.findOne({
      _id: req.user.id,
      deleted_at: null,
      is_verified: true,
    });

    if (!user) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    await cloudinaryServices(req, res);

    if (name) {
      user.name = name;
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (req.body.images) {
      user.image_url = req.body.images[0];
    }
    if (phone_number) {
      user.phone_number = phone_number;
    }

    await user.save();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_UPDATED,
      data: {
        user,
      },
    });
  } catch (err) {
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    next(err);
  }
};

const deleteUserCMS = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id, deleted_at: null, is_verified: true },
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!user) {
      throw new customError.NotFoundError(
        RES.NOT_FOUND,
        RES.USERS_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_DELETED,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getAllUsersCMS,
  updateUser,
  deleteUserCMS,
};
