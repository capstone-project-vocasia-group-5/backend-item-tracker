const { Notification } = require("../models/notification_model");
const RES = require("../config/resMessage");
const mongoose = require("mongoose");
const CFG = require("../config/const");
const getNotificationById = async (req, res, next) => {
  try {
    let modifiedNotification;
    const notification = await Notification.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    })
      .populate([
        {
          path: "item_id",
        },
        {
          path: "comment_id",
        },
        {
          path: "claim_id",
        },
      ])
      .lean();

    if (notification) {
      modifiedNotification = {
        ...notification,
        item: notification.item_id,
        comment: notification.comment_id,
        claim: notification.claim_id,
      };

      delete modifiedNotification.item_id;
      delete modifiedNotification.comment_id;
      delete modifiedNotification.claim_id;
      delete modifiedNotification.__v;
      delete modifiedNotification.deleted_at;
    }

    if (!notification) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        notification: modifiedNotification,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      {
        $set: {
          is_read: true,
        },
      },
      {
        new: true,
      }
    );

    if (!notification) {
      throw new customError.NotFoundError(
        RES.NOT_FOUND,
        RES.NOTIFICATION_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_UPDATED,
      data: {
        notification,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getNotificationByUserId = async (req, res, next) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const validatedPage = !isNaN(page) && page > 0 ? parseInt(page, 10) : 1;
    const validatedLimit =
      !isNaN(limit) && limit > 0 ? parseInt(limit, 10) : 10;

    const offset = (validatedPage - 1) * validatedLimit;

    const filter = {
      user_id: req.user.id,
      deleted_at: null,
    };

    if (search.trim()) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    const totalDocuments = await Notification.countDocuments(filter);

    const resNotifications = await Notification.find(filter)
      .populate([
        {
          path: "item_id",
        },
        {
          path: "comment_id",
          populate: {
            path: "item_id",
            select: "-user_id -phone_number -messages",
          },
        },
        {
          path: "claim_id",
        },
      ])
      .lean()
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(validatedLimit);

    const notifications =
      resNotifications.map((notification) => {
        const modifiedNotification = {
          ...notification,
          item: notification.item_id,
          comment: notification.comment_id,
          claim: notification.claim_id,
        };

        delete modifiedNotification.item_id;
        delete modifiedNotification.comment_id;
        delete modifiedNotification.claim_id;
        delete modifiedNotification.__v;
        delete modifiedNotification.deleted_at;

        return modifiedNotification;
      }) || [];

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        notifications,
        pagination: {
          total: totalDocuments,
          page: validatedPage,
          limit: validatedLimit,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const getNotificationByAdmin = async (req, res, next) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const validatedPage = !isNaN(page) && page > 0 ? parseInt(page, 10) : 1;
    const validatedLimit =
      !isNaN(limit) && limit > 0 ? parseInt(limit, 10) : 10;

    const offset = (validatedPage - 1) * validatedLimit;

    const filter = {
      role: CFG.ROLES.ADMIN,
      deleted_at: null,
    };

    if (search.trim()) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    const totalDocuments = await Notification.countDocuments(filter);

    const resNotifications = await Notification.find(filter)
      .populate([
        {
          path: "item_id",
        },
        {
          path: "comment_id",
        },
      ])
      .lean()
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(validatedLimit);

    const notifications =
      resNotifications.map((notification) => {
        const modifiedNotification = {
          ...notification,
          item: notification.item_id,
          comment: notification.comment_id,
          claim: notification.claim_id,
        };

        delete modifiedNotification.item_id;
        delete modifiedNotification.comment_id;
        delete modifiedNotification.claim_id;
        delete modifiedNotification.__v;
        delete modifiedNotification.deleted_at;

        return modifiedNotification;
      }) || [];

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        notifications,
        pagination: {
          total: totalDocuments,
          page: validatedPage,
          limit: validatedLimit,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotificationById,
  getNotificationByUserId,
  updateNotification,
  getNotificationByAdmin,
};
