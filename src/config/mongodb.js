const RES = require("./resMessage");
const mongoose = require("mongoose");
const { urlDb } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(urlDb);
    console.log(RES.MONGO_DB_CONNECTED);
  } catch (error) {
    console.error(RES.ERROR_CONNECTING_TO_MONGODB, error);
    process.exit(1);
  }
};

module.exports = connectDB;
