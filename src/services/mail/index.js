const nodemailer = require("nodemailer");
const { gmail, password } = require("../../config/config");
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync(
      path.join(__dirname, "../../views/email/otp.html"),
      "utf8"
    );

    let message = {
      from: gmail,
      to: email,
      subject: "OTP Untuk Verifikasi Akun",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const thanksMail = async (email, data) => {
  try {
    let template = fs.readFileSync(
      path.join(__dirname, "../../views/email/thanks.html"),
      "utf8"
    );

    let message = {
      from: gmail,
      to: email,
      subject: "Terima Kasih Atas Kontribusi Anda",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const sendMail = async (email, data) => {
  try {
    let template = fs.readFileSync(
      path.join(__dirname, `../../views/email/${data.type}.html`),
      "utf8"
    );

    let message = {
      from: gmail,
      to: email,
      subject: data.subject,
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail, thanksMail, sendMail };
