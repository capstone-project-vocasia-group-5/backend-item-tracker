const RES = require("../config/resMessage");
const CFG = require("../config/const");
const customError = require("../errors");
const { User, validateUser } = require("../models/user_model");

const getUserById = async (req, res) => {
  "implement me";
};

const getAllUsersCMS = async (req, res) => {
  "implement me";
};

const updateUser = async (req, res) => {
  "implement me";
};

const deleteUserCMS = async (req, res) => {
  "implement me";
};

module.exports = {
  getUserById,
  getAllUsersCMS,
  updateUser,
  deleteUserCMS,
};
