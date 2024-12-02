const customError = require("../errors");
const { Comment, validateComment } = require("../models/comment_model");
const { Item } = require("../models/item_model");
const RES = require("../config/resMessage");
const notificationService = require("../services/mongoose/notification_service");

const createComment = async (req, res, next) => {
  const { comment_text } = req.body;
  const item_id = req.params.item_id;

  try {
    const { error } = validateComment.create(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const item = await Item.findOne({
      _id: item_id,
      approved: true,
      deleted_at: null,
    });

    if (!item) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    const comment = await Comment.create({
      user_id: req.user.id,
      item_id,
      comment_text,
    });

    if (!comment) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    await notificationService.createNotification({
      user_id: item.user_id,
      title: RES.NEW_COMMENT,
      comment_id: comment.id,
    });

    res.status(201).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  const comment_id = req.params.comment_id;
  const { comment_text } = req.body;

  try {
    const { error } = validateComment.update(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const comment = await Comment.findOneAndUpdate(
      { _id: comment_id, user_id: req.user.id, deleted_at: null },
      { comment_text },
      { new: true }
    );

    if (!comment) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_UPDATED,
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  const comment_id = req.params.comment_id;
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: comment_id, user_id: req.user.id, deleted_at: null },
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!comment) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_DELETED,
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTotalItemComment = async (req, res, next) => {
  const item_id = req.params.item_id;

  try {
    const totalComments = await Comment.countDocuments({
      item_id,
      deleted_at: null,
    });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        total_comments: totalComments,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getCommentById = async (req, res, next) => {
  const comment_id = req.params.comment_id;
  try {
    const comment = await Comment.findOne({
      _id: comment_id,
      deleted_at: null,
    });

    if (!comment) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getCommentByItemId = async (req, res, next) => {
  const item_id = req.params.item_id;
  try {
    const comment = await Comment.find({
      item_id,
      deleted_at: null,
    }).sort({ created_at: -1 });

    if (!comment) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getCommentByItemId,
  getTotalItemComment,
};
