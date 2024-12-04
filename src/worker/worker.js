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
  }).select("+otp +otp_expires_at +otp_status");

  for (const user of users) {
    try {
      console.log(`Sending OTP to ${user.email}`);
      await otpMail(user.email, { otp: user.otp });

      console.log(`OTP sent to ${user.email}`);

      user.otp_status = true;
      await user.save();
    } catch (err) {
      console.log(`Error sending OTP to ${user.email}: ${err.message}`);
    }
  }
}

async function processEmailWithFalseSend() {
  console.log("Checking email logs with false send...");

  const emailLogs = await EmailLogs.find({
    send_status: false,
    deleted_at: null,
  })
    .populate("item_id")
    .populate("claim_id");

  for (const email of emailLogs) {
    try {
      console.log(`Sending MAIL to ${email.email}`);
      let item;
      if (email.type === RES.CLAIM) {
        item = await Item.findOne({
          _id: email.claim_id.item_id,
        });
      } else {
        item = await Item.findOne({
          _id: email.item_id.id,
        });
      }

      await sendMail(email.email, {
        type: email.type,
        subject: email.subject,
        description: email.description,
        images: email.item_id?.images || email.claim_id?.images || [],
        name: email.name,
        itemName: item?.name || "",
      });

      console.log(`EMAIL sent to ${email.email}`);

      email.send_status = true;
      await email.save();
    } catch (err) {
      console.log(`Error sending OTP to ${email.email}: ${err.message}`);
    }
  }
}

setInterval(processUsersWithOtp, 5000);
setInterval(processEmailWithFalseSend, 5000);
