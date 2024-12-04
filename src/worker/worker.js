const mongoose = require("mongoose");
const { User } = require("../models/user_model");
const { otpMail, sendMail } = require("../services/mail/index");
const { urlDb } = require("../config/config");
const { EmailLogs } = require("../models/email_log_model");
const RES = require("../config/resMessage");
const { Item } = require("../models/item_model");

mongoose.connect(urlDb);

async function processUsersWithOtp() {
  console.log("Checking users with active OTPs...");

  const users = await User.find({
    otp: { $ne: null },
    deleted_at: null,
    otp_expires_at: { $gt: new Date() },
    otp_status: false,
    processing: false,
  }).select("+otp +otp_expires_at +otp_status");

  for (const user of users) {
    try {
      user.processing = true;
      await user.save();

      console.log(`Sending OTP to ${user.email}`);
      await otpMail(user.email, { otp: user.otp });

      console.log(`OTP sent to ${user.email}`);

      user.otp_status = true;
      await user.save();
    } catch (err) {
      console.log(`Error sending OTP to ${user.email}: ${err.message}`);
    } finally {
      user.processing = false;
      await user.save();
    }
  }
}

async function processEmailWithFalseSend() {
  console.log("Checking email logs with false send...");

  const emailLogs = await EmailLogs.find({
    send_status: false,
    processing: false,
  })
    .populate("item_id")
    .populate("claim_id");

  for (const currEmailLogs of emailLogs) {
    try {
      currEmailLogs.processing = true;
      await currEmailLogs.save();

      console.log(`Sending MAIL to ${currEmailLogs.email}`);
      let item;
      if (currEmailLogs.type === RES.CLAIM) {
        item = await Item.findOne({
          _id: currEmailLogs.claim_id.item_id,
        });
      } else {
        item = await Item.findOne({
          _id: currEmailLogs.item_id.id,
        });
      }

      await sendMail(currEmailLogs.email, {
        type: currEmailLogs.type,
        subject: currEmailLogs.subject,
        description: currEmailLogs.description,
        images:
          currEmailLogs.item_id?.images || currEmailLogs.claim_id?.images || [],
        name: currEmailLogs.name,
        itemName: item?.name || "",
      });

      console.log(`EMAIL sent to ${currEmailLogs.email}`);

      currEmailLogs.send_status = true;
      await currEmailLogs.save();
    } catch (err) {
      console.log(`Error sending OTP to ${email.email}: ${err.message}`);
    } finally {
      currEmailLogs.processing = false;
      await currEmailLogs.save();
    }
  }
}

setInterval(processUsersWithOtp, 5000);
setInterval(processEmailWithFalseSend, 5000);
