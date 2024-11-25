const RES = require("../config/resMessage");
const customError = require("../errors");
const User = require("../models/user_model");

const getUserById = async (req, res) => {
  "implement me";
};

const getAllUsersCMS = async (req, res) => {
  "implement me";
};

const signUp = async (req, res) => {
  "implement me";
};

const updateUser = async (req, res) => {
  "implement me";
};

const deleteUserCMS = async (req, res) => {
  "implement me";
};

const authenticateOTP = async (req, res) => {
  "implement me";
};

const signIn = async (req, res) => {
  "implement me";
};

const forgotPassword = async (req, res) => {
  "implement me";
};

const signInCMS = async (req, res) => {
  "implement me";
};

module.exports = {
  getUserById,
  getAllUsersCMS,
  signUp,
  updateUser,
  deleteUserCMS,
  signIn,
  authenticateOTP,
  forgotPassword,
  signInCMS,
};
