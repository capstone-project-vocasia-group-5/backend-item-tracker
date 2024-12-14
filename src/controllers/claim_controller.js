const RES = require("../config/resMessage");
const { Claim, validateClaim } = require("../models/claim_model");
const { Item } = require("../models/item_model");
const customError = require("../errors");
const cloudinaryServices = require("../services/cloudinary");
const fs = require("fs-extra");
const notificationService = require("../services/mongoose/notification_service");
const mongoose = require("mongoose");
const { EmailLogs } = require("../models/email_log_model");
const { User } = require("../models/user_model");

const createClaim = async (req, res, next) => {
  const { item_id, claim_text } = req.body;
  try {
    const item = await Item.findOne({
      _id: item_id,
      approved: true,
      deleted_at: null,
    });

    if (!item) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.ITEM_NOT_FOUND);
    }

    if (item.matched_status) {
      throw new customError.BadRequestError(
        RES.BAD_REQUEST,
        RES.ITEM_ALREADY_MATCHED
      );
    }

    if (item.user_id.toString() === req.user.id) {
      throw new customError.BadRequestError(
        RES.BAD_REQUEST,
        RES.YOU_CANNOT_CLAIM_YOUR_OWN_ITEM
      );
    }

    const checkClaim = await Claim.findOne({
      user_id: req.user.id,
      to_user_id: item.user_id,
      item_id: req.body.item_id,
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
      to_user_id: item.user_id,
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

    await notificationService.createNotification({
      user_id: item.user_id,
      title: RES.CLAIM_CREATED,
      claim_id: claim.id,
    });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
      data: {
        claim,
      },
    });
  } catch (err) {
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
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
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
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
  const { page = 1, limit = 10 } = req.query;

  try {
    const validatedPage = !isNaN(page) && page > 0 ? parseInt(page, 10) : 1;
    const validatedLimit =
      !isNaN(limit) && limit > 0 ? parseInt(limit, 10) : 10;

    const filter = {
      $or: [{ user_id: req.user.id }, { to_user_id: req.user.id }],
      deleted_at: null,
    };

    const totalClaims = await Claim.countDocuments(filter);

    const claims = await Claim.find(filter)
      .skip((validatedPage - 1) * validatedLimit)
      .limit(validatedLimit)
      .populate({
        path: "item_id",
        select: "-user_id -phone_number -messages",
      })
      .populate({
        path: "user_id",
        select: "-email -role",
      });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        claims,
        pagination: {
          currentPage: validatedPage,
          totalPages: Math.ceil(totalClaims / validatedLimit),
          totalItems: totalClaims,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const approveClaim = async (req, res, next) => {
  const claim_id = req.params.claim_id;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const claim = await Claim.findOneAndUpdate(
      {
        _id: claim_id,
        to_user_id: req.user.id,
        is_approved: null,
        deleted_at: null,
      },
      { is_approved: true },
      { new: true, session }
    );

    if (!claim) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CLAIMS_IS_NOT_FOUND
      );
    }

    const user = await User.findById(claim.user_id).session(session);
    const emailLog = await EmailLogs.create(
      [
        {
          claim_id: claim.id,
          name: user.name,
          email: user.email,
          type: RES.CLAIM,
          subject: RES.SUBJECT_CLAIM_APPROVED,
          title: RES.CLAIM_APPROVED,
          description: RES.DESCRIPTION_CLAIM_APPROVED,
        },
      ],
      { session }
    );

    if (!emailLog) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    const item = await Item.findOne(
      {
        _id: claim.item_id,
        approved: true,
        deleted_at: null,
      },
      null,
      { session }
    );

    if (!item) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.ITEM_IS_NOT_FOUND);
    }

    if (item.matched_status) {
      throw new customError.BadRequestError(
        RES.BAD_REQUEST,
        RES.ITEM_ALREADY_MATCHED
      );
    }

    item.matched_status = true;
    await item.save({ session });

    const claimsToUpdate = await Claim.find(
      { item_id: item.id, deleted_at: null, is_approved: null },
      null,
      { session }
    );

    const updatedClaims = await Claim.updateMany(
      { item_id: item.id, deleted_at: null, is_approved: null },
      { $set: { is_approved: false } },
      { session }
    );

    if (!updatedClaims) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_UPDATING
      );
    }

    for (const claim of claimsToUpdate) {
      await notificationService.createNotification({
        user_id: claim.user_id,
        title: RES.CLAIM_REJECTED,
        claim_id: claim.id,
      });
    }

    await notificationService.createNotification({
      user_id: claim.user_id,
      title: RES.CLAIM_APPROVED,
      claim_id: claim.id,
    });

    await session.commitTransaction();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_APPROVED,
      data: {
        claim,
      },
    });
  } catch (err) {
    next(err);
  }
};

const rejectClaim = async (req, res, next) => {
  const claim_id = req.params.claim_id;
  const { messages } = req.body;
  try {
    if (!messages) {
      throw new customError.BadRequestError(
        RES.BAD_REQUEST,
        RES.MESSAGES_IS_REQUIRED
      );
    }
    const claim = await Claim.findOneAndUpdate(
      {
        _id: claim_id,
        to_user_id: req.user.id,
        is_approved: null,
        deleted_at: null,
      },
      { is_approved: false, messages },
      { new: true }
    );

    if (!claim) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CLAIMS_IS_NOT_FOUND
      );
    }

    const user = await User.findById(claim.user_id);

    const emailLog = await EmailLogs.create({
      claim_id: claim.id,
      name: user.name,
      email: user.email,
      type: RES.CLAIM,
      subject: RES.SUBJECT_CLAIM_REJECTED,
      title: RES.CLAIM_REJECTED,
      description: RES.DESCRIPTION_CLAIM_REJECTED + " " + messages,
    });

    if (!emailLog) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    await notificationService.createNotification({
      user_id: claim.user_id,
      title: RES.CLAIM_REJECTED,
      claim_id: claim.id,
    });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_REJECTED,
      data: {
        claim,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteClaim = async (req, res, next) => {
  const claim_id = req.params.claim_id;
  try {
    const claim = await Claim.findOneAndUpdate(
      {
        _id: claim_id,
        user_id: req.user.id,
        is_approved: null,
        deleted_at: null,
      },
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!claim) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CLAIMS_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_DELETED,
      data: {
        claim,
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
  approveClaim,
  rejectClaim,
  deleteClaim,
};
