const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const { Claim } = require("./claim_model");
const { Item } = require("./item_model");

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

      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      return ret;
    },
  },
};

// Schema Definition
const emailLogSchema = new mongoose.Schema(
  {
    claim_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      default: null,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      default: null,
    },
    name: {
      type: String,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_NAME],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_EMAIL],
    },
    title: {
      type: String,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_TITLE],
      minlength: 3,
      maxlength: 50,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    subject: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_DESCRIPTION],
    },
    send_status: {
      type: Boolean,
      default: false,
    },
    processing: {
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

const EmailLogs = mongoose.model("EmailLogs", emailLogSchema);

module.exports = {
  EmailLogs,
};
