const RES = require("../config/resMessage");
const mongoose = require("mongoose");

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
