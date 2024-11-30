const RES = require("../config/resMessage");
const CFG = require("../config/const");
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
      delete ret.deleted_at;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.deleted_at;
      return ret;
    },
  },
};

// Schema Definition
const itemSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      default: null,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_NAME],
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      default: null,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_DESCRIPTION],
      minlength: 3,
      maxlength: 500,
    },
    matched_status: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      required: [true, RES.IMAGE_IS_REQUIRED],
    },
    approved: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: CFG.TYPE.LOST,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_TYPE],
    },
    province: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, RES.PLEASE_PROVIDE_VALID_PROVINCE],
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, RES.PLEASE_PROVIDE_VALID_CITY],
    },
    subdistrict: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, RES.PLEASE_PROVIDE_VALID_SUBDISTRICT],
    },
    village: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, RES.PLEASE_PROVIDE_VALID_VILLAGE],
    },
    postal_code: {
      type: Number,
      required: [true, RES.PLEASE_PROVIDE_VALID_POSTAL_CODE],
    },
    phone_number: {
      type: String,
      required: [true, RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER],
      trim: true,
    },
    messages: {
      type: String,
      default: null,
      trim: true,
      maxlength: 500,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

// Validations
const validateItem = {
  create: (item) => {
    const schema = joi.object({
      name: joi.string().required().max(50).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_NAME,
        "string.max": RES.NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS,
      }),
      description: joi.string().required().max(500).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_DESCRIPTION,
        "string.max": RES.DESCRIPTION_SHOULD_HAVE_MAXIMUM_500_CHARACTERS,
      }),
      type: joi.string().required().messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_TYPE,
      }),
      province: joi.string().required().max(100).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_PROVINCE,
      }),
      city: joi.string().required().max(100).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_CITY,
      }),
      subdistrict: joi.string().required().max(100).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_SUBDISTRICT,
      }),
      village: joi.string().required().max(100).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_VILLAGE,
      }),
      postal_code: joi.number().integer().max(99999).messages({
        "number.base": RES.PLEASE_PROVIDE_VALID_POSTAL_CODE,
        "number.integer": RES.PLEASE_PROVIDE_VALID_POSTAL_CODE,
      }),
      images: joi.array().items(joi.string().uri()).min(1).messages({
        "array.min": RES.IMAGE_IS_REQUIRED,
        "array.items": RES.IMAGE_MUST_BE_VALID_URI,
      }),
      phone_number: joi
        .string()
        .required()
        .pattern(/^\+?62[0-9]{8,13}$/)
        .messages({
          "string.pattern.base": RES.PHONE_NUMBER_MUST_START_WITH,
          "any.required": RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER,
        }),
      categories: joi.array().items(joi.string()).required().messages({
        "array.items": RES.CATEGORY_ID_MUST_BE_VALID,
        "any.required": RES.PLEASE_PROVIDE_VALID_CATEGORY_ID,
      }),
    });
    return schema.validate(item, { abortEarly: false });
  },
  update: (item) => {
    const schema = joi.object({
      name: joi.string().max(50),
      description: joi.string().max(500),
      type: joi.string(),
      province: joi.string().max(100),
      city: joi.string().max(100),
      subdistrict: joi.string().max(100),
      village: joi.string().max(100),
      postal_code: joi.number(),
      phone_number: joi
        .string()
        .allow(null)
        .min(10)
        .max(15)
        .pattern(/^(?:\+62|62|0)(?:8[1-9])[0-9]{6,9}$/)
        .messages({
          "string.pattern.base": RES.PLEASE_PROVIDE_VALID_PHONE_NUMBER,
        }),
      messages: joi.string().max(500),
      images: joi.array().items(joi.string().uri()).messages({
        "any.required": RES.IMAGE_MUST_BE_VALID_URI,
      }),
      categories: joi.array().items(joi.string()).messages({
        "array.items": RES.CATEGORY_ID_MUST_BE_VALID,
        "any.required": RES.PLEASE_PROVIDE_VALID_CATEGORY_ID,
      }),
    });
    return schema.validate(item, { abortEarly: false });
  },
};

// Query Helpers
itemSchema.query.notDeleted = function () {
  return this.where({ deleted_at: null });
};

itemSchema.query.notApproved = function () {
  return this.where({ approved: false });
};

// Indexes
itemSchema.index({ deleted_at: 1 });
itemSchema.index({ name: 1, deleted_at: 1 });
itemSchema.index({ user_id: 1, deleted_at: 1 });
itemSchema.index({
  province: 1,
  city: 1,
  subdistrict: 1,
  village: 1,
  deleted_at: 1,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = {
  Item,
  validateItem,
};
