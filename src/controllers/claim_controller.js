const RES = require("../config/resMessage");
const { Claim, validateClaim } = require("../models/claim_model");
const customError = require("../errors");
const cloudinaryServices = require("../services/cloudinary");
const fs = require("fs-extra");

const createClaim = async (req, res, next) => {
  const { item_id, claim_text } = req.body;
  try {
    const checkClaim = await Claim.findOne({
      user_id: req.user.id,
      item_id: req.body.item_id,
      deleted_at: null,
    });

    if (checkClaim) {
      throw new customError.ConflictError(
        RES.CONFLICT,
        RES.CLAIM_ALREADY_EXISTS
      );
    }

    await cloudinaryServices(req, res);

    const { error } = validateClaim.create(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const claim = await Claim.create({
      user_id: req.user.id,
      item_id,
      claim_text,
      images: req.body.images,
    });

    if (!claim) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
      data: {
        claim,
      },
    });
  } catch (err) {
    if (req.files) {
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
    next(err);
  }
};

const getClaimById = async (req, res, next) => {
  try {
    const claim = await Claim.findOne({
      _id: req.params.id,
      deleted_at: null,
    }).populate("item_id");

    if (!claim) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CLAIMS_IS_NOT_FOUND
      );
    }

    if (
      claim.user_id.toString() !== req.user.id &&
      claim.item_id.user_id.toString() !== req.user.id
    ) {
      throw new customError.UnauthorizedError(
        RES.UNAUTHORIZED,
        RES.UNAUTHORIZED_ACCESS
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        claim,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({ user_id: req.user.id, deleted_at: null });

    if (!claims) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CLAIMS_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        claims,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createClaim,
  getClaimById,
  getAllClaims,
};
