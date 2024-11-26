const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const joi = require("joi");
const joiObjectId = require("joi-objectid")(joi);

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
const claimSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    // to_user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   index: true,
    //   required: true,
    // },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      index: true,
      required: true,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      required: [true, RES.IMAGE_IS_REQUIRED],
    },
    claim_text: {
      type: String,
      trim: true,
      required: [true, RES.PLEASE_PROVIDE_VALID_CLAIM_TEXT],
      maxlength: 500,
    },
    deleted_at: {
      type: Date,
    },
  },
  schemaOptions
);

// Validations
const validateClaim = {
  /**
   * Validates a claim object against the defined Joi schema.
   *
   * @param {Object} claim - The claim object to validate.
   * @param {string} claim.user_id - The ID of the user making the claim.
   * @param {string} claim.to_user_id - The ID of the user to whom the claim is made.
   * @param {string} claim.item_id - The ID of the item being claimed.
   * @param {string} claim.claim_text - The text description of the claim, required and max length of 500.
   * @param {Array<string>} claim.images - An array of image URIs related to the claim, required.
   * @returns {Object} - The result of the validation, containing any validation errors.
   */
  create: (claim) => {
    const schema = joi.object({
      user_id: joiObjectId().required().messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_USER_ID,
      }),
      to_user_id: joiObjectId().required().messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_USER_ID,
      }),
      item_id: joiObjectId().required().messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_ITEM_ID,
      }),
      claim_text: joi.string().required().max(500).messages({
        "string.empty": RES.PLEASE_PROVIDE_VALID_CLAIM_TEXT,
        "string.max": RES.CLAIM_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS,
      }),
      images: joi.array().items(joi.string().uri()).required().min(1).messages({
        "any.required": RES.IMAGE_IS_REQUIRED,
        "string.empty": RES.IMAGE_IS_REQUIRED,
        "string.uri": RES.PLEASE_PROVIDE_VALID_IMAGE_URL,
      }),
    });
    return schema.validate(claim, { abortEarly: false });
  },
};

// Query Helpers
claimSchema.query.notDeleted = function () {
  return this.where({ deleted_at: null });
};

claimSchema.query.notApproved = function () {
  return this.where({ is_approved: false });
};

// Indexes
claimSchema.index({ user_id: 1, deleted_at: 1 });
claimSchema.index({ to_user_id: 1, deleted_at: 1 });
claimSchema.index({ item_id: 1, deleted_at: 1 });
claimSchema.index({ is_approved: 1, deleted_at: 1 });

const Claim = mongoose.model("Claim", claimSchema);

module.exports = {
  Claim,
  validateClaim,
};
