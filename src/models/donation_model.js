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
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if (ret.is_anonymous) {
        ret.name = "Anonymous";
        delete ret.email;
      }
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if (ret.is_anonymous) {
        ret.name = "Anonymous";
        delete ret.email;
      }
      return ret;
    },
  },
};

// Schema Definition
const donationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    name: {
      type: String,
      default: null,
      maxlength: [50, RES.NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS],
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_NAME],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_EMAIL],
    },
    amount: {
      type: Number,
      required: [true, RES.PLEASE_PROVIDE_VALID_AMOUNT],
      min: [10000, RES.MINIMUM_DONATION_AMOUNT_IS_10000],
    },
    is_anonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    payment_method: {
      type: String,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

// Validations
const validateDonation = {
  create: (donation) => {
    const schema = joi.object({
      name: joi.string().max(50).required().messages({
        "string.max": "Name cannot exceed 50 characters",
      }),
      email: joi.string().email().required().messages({
        "string.email": RES.PLEASE_PROVIDE_VALID_EMAIL,
      }),
      amount: joi.number().required().min(10000).messages({
        "number.min": "Minimum donation amount is 10000",
        "any.required": RES.PLEASE_PROVIDE_VALID_AMOUNT,
      }),
      is_anonymous: joi.boolean().default(false),
    });
    return schema.validate(donation, { abortEarly: false, convert: true });
  },
  update: (donation) => {
    const schema = joi.object({
      status: joi.string().valid("pending", "success", "failed"),
    });
    return schema.validate(donation, { abortEarly: false, convert: true });
  },
};

// Virtuals
donationSchema.virtual("formatted_amount").get(function () {
  if (this.deleted_at) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(this.amount);
});

// Indexes
donationSchema.index({ user_id: 1, deleted_at: 1 });
donationSchema.index({ status: 1, deleted_at: 1 });
donationSchema.index({ created_at: -1 });

const Donation = mongoose.model("Donation", donationSchema);

module.exports = {
  Donation,
  validateDonation,
};
