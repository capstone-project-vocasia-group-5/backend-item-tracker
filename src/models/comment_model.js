const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const joi = require("joi");
const { User } = require("./user_model");

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
const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      default: null,
      index: true,
    },
    comment_text: {
      type: String,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_COMMENT_TEXT],
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
const validateComment = {
  create: (comment) => {
    const schema = joi.object({
      comment_text: joi.string().required().max(500).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_COMMENT_TEXT,
        "string.max": RES.COMMENT_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS,
      }),
    });
    return schema.validate(comment, { abortEarly: false });
  },
  update: (comment) => {
    const schema = joi.object({
      comment_text: joi.string().max(500).messages({
        "string.max": RES.COMMENT_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS,
      }),
    });
    return schema.validate(comment, { abortEarly: false });
  },
};

// Statics
commentSchema.statics.getTotalComments = async function () {
  const result = await this.aggregate([
    { $match: { deleted_at: null } },
    { $group: { _id: null, total: { $sum: 1 } } },
  ]);
  return result.length ? result[0].total : 0;
};

// Indexes
commentSchema.index({ user_id: 1, deleted_at: 1 });
commentSchema.index({ item_id: 1, deleted_at: 1 });
commentSchema.index({ created_at: -1 });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Comment,
  validateComment,
};
