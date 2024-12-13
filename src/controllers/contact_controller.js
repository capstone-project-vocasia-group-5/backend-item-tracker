const RES = require("../config/resMessage");
const customError = require("../errors");
const emailServices = require("../services/mail");

const contactUs = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        RES.ALL_FIELDS_REQUIRED
      );
    }

    const data = {
      name,
      email,
      subject,
      message,
    };

    await emailServices.ourContactMail(data);

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  contactUs,
};
