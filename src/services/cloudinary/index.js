const fs = require("fs-extra");
const { ccfolder } = require("../../config/config");
const cloudinary = require("../../config/cloudinary");
const customError = require("../../errors");
const RES = require("../../config/resMessage");

const cloudinaryServices = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      const fileUploadPromises = req.files.map((file) =>
        cloudinary.uploader
          .upload(file.path, {
            folder: ccfolder,
            transformation: {
              quality: 50,
              fetch_format: "webp",
            },
          })
          .catch((err) => ({ error: err }))
      );

      const uploadResults = await Promise.all(fileUploadPromises);

      const imageUrls = uploadResults
        .filter((result) => !result.error)
        .map((result) => result.secure_url);

      if (imageUrls.length === 0) {
        throw new customError.BadRequestError(
          RES.INTERNAL_SERVER_ERROR,
          RES.SOMETHING_WENT_WRONG_WHILE_UPLOADING
        );
      }

      req.body.images = imageUrls;

      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
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

module.exports = cloudinaryServices;
