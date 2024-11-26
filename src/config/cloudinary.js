const cloudinary = require("cloudinary").v2;
const { ccname, ccapikey, ccapisecret, ccfolder } = require("./config");

cloudinary.config({
  cloud_name: ccname,
  api_key: ccapikey,
  api_secret: ccapisecret,
  folder: ccfolder,
});

module.exports = cloudinary;
