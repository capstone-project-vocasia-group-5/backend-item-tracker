const { Notification } = require("../../models/notification_model");

const createNotification = async (data, session) => {
  const notification = new Notification(data);
  return await notification.save({ session });
};

module.exports = {
  createNotification,
};
