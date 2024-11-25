const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const joi = require("joi");

// Schema Options
const schemaOptions = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
};

// Schema Definition
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_NAME],
      minlength: 3,
      maxlength: 50,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

// Validations
const validateCategory = {
  create: (category) => {
    const schema = joi.object({
      name: joi.string().required().max(50).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_NAME,
        "string.max": RES.NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS,
      }),
    });
    return schema.validate(category, { abortEarly: false });
  },
  update: (category) => {
    const schema = joi.object({
      name: joi.string().required().max(50).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_NAME,
        "string.max": RES.NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS,
      }),
    });
    return schema.validate(category, { abortEarly: false });
  },
};

// Indexes
categorySchema.index({ name: 1 });
categorySchema.index({ deleted_at: 1 });
categorySchema.index({ name: 1, deleted_at: 1 });

const Category = mongoose.model("Category", categorySchema);

module.exports = {
  Category,
  validateCategory,
};
