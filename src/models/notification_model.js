const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const { Item } = require("./item_model");
const { Claim } = require("./claim_model");
const { Comment } = require("./comment_model");
const { Donation } = require("./donation_model");

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

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    claim_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      index: true,
      default: null,
    },
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      index: true,
      default: null,
    },
    donation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      index: true,
      default: null,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      index: true,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    is_read: {
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

// Indexes
notificationSchema.index({ user_id: 1, deleted_at: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = {
  Notification,
};
