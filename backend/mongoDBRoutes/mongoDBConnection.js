const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
