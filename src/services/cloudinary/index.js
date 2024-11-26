const fs = require("fs-extra");
const { ccfolder } = require("../../config/config");
const cloudinary = require("../../config/cloudinary");

const cloudinaryServices = async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      const fileUploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: ccfolder,
          transformation: {
            quality: 50,
            fetch_format: "webp",
          },
        })
      );

      const uploadResults = await Promise.all(fileUploadPromises);

      const imageUrls = uploadResults.map((result) => result.secure_url);

      req.body.images = imageUrls;

      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
  } catch (error) {
    req.files.forEach((file) => fs.unlinkSync(file.path));
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Error uploading images" });
  }
};

module.exports = cloudinaryServices;
