const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const joi = require("joi");

// Schema Options
const schemaOptions = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.otp;
      delete ret.password;
      delete ret.deleted_at;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.otp;
      delete ret.password;
      delete ret.deleted_at;
      return ret;
    },
  },
};

// Schema Definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, RES.PLEASE_PROVIDE_VALID_NAME],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    username: {
      type: String,
      required: [true, RES.PLEASE_PROVIDE_VALID_USERNAME],
      minlength: 3,
      maxlength: 50,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, RES.PLEASE_PROVIDE_VALID_EMAIL],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        RES.PLEASE_PROVIDE_VALID_EMAIL,
      ],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, RES.PLEASE_PROVIDE_VALID_PASSWORD],
      minlength: 6,
      select: false,
    },
    image_url: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },
    phone_number: {
      type: String,
      required: [true, RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER],
      trim: true,
    },
    otp: {
      type: String,
      default: null,
      select: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

// Validations
const validateUser = {
  create: (user) => {
    const schema = joi.object({
      name: joi.string().min(3).max(50).required().messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_NAME,
        "string.min": RES.NAME_SHOULD_HAVE_MINIMUM_3_CHARACTERS,
        "string.max": RES.NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS,
      }),
      username: joi.string().min(3).max(50).required().messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_USERNAME,
      }),
      email: joi.string().email().required().messages({
        "string.email": RES.PLEASE_PROVIDE_VALID_EMAIL,
      }),
      password: joi
        .string()
        .min(6)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .messages({
          "string.pattern.base":
            RES.PASSWORD_MUST_CONTAINT_ONLY_LETTERS_AND_NUMBERS,
        }),
      image_url: joi.string().allow(null),
      role: joi.string().valid("user", "admin").default("user"),
      phone_number: joi
        .string()
        .required()
        .min(10)
        .max(15)
        .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        .messages({
          "string.empty": RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER,
          "string.pattern.base": RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER,
          "any.required": RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER,
        }),
    });
    return schema.validate(user, { abortEarly: false });
  },
  update: (user) => {
    const schema = joi.object({
      name: joi.string().min(3).max(50),
      phone_number: joi
        .string()
        .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
      image_url: joi.string().allow(null),
    });
    return schema.validate(user, { abortEarly: false });
  },
};

// Methods
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Query Helpers
userSchema.query.notDeleted = function () {
  return this.where({ deleted_at: null });
};

userSchema.query.byRole = function (role) {
  return this.where({ role });
};

// Statics
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email, deleted_at: null });
};

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    deleted_at: null,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

// Middleware/Hooks
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Indexes
userSchema.index({ username: 1, deleted_at: 1 }, { unique: true });
userSchema.index({ email: 1, deleted_at: 1 }, { unique: true });
userSchema.index({ name: 1 });
userSchema.index({ deleted_at: 1 });
userSchema.index({ name: 1, deleted_at: 1 });

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateUser,
};
