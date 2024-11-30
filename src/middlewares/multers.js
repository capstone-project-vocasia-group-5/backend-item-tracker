const multer = require("multer");
const RES = require("../config/resMessage");
const path = require("path");
const { generateUUID } = require("../utils");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = generateUUID();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: RES.UNSUPPORT_FILE_FORMAT,
      },
      false
    );
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB
  fileFilter: fileFilter,
});

const uploadMultiple = upload.array("images", 5);

module.exports = { uploadMultiple };
