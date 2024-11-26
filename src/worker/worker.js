const mongoose = require("mongoose");
const { User } = require("../models/user_model");
const { otpMail } = require("../services/mail/index");
const { urlDb } = require("../config/config");

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

setInterval(processUsersWithOtp, 5000);
