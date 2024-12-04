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
const donationLogSchema = new mongoose.Schema(
  {
    donation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    status_logs: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

const DonationLogs = mongoose.model("DonationLogs", donationLogSchema);

module.exports = {
  DonationLogs,
};
