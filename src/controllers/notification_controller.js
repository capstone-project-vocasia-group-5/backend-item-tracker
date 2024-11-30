const { Notification } = require("../models/notification_model");
const RES = require("../config/resMessage");
const mongoose = require("mongoose");
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
  try {
    let notifications;
    const resNotifications = await Notification.find({
      user_id: req.user.id,
      deleted_at: null,
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

    if (resNotifications && resNotifications.length > 0) {
      notifications = resNotifications.map((notification) => {
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
      });
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        notifications,
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
};
