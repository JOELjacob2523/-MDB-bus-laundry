const mongoose = require("mongoose");
const connectDB = require("./mongoDBConnection");

connectDB();

const StudentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip_code: Number,
  phone: Number,
  date: {
    type: Date,
    default: new Date(),
  },
});

const StudentModel = mongoose.model("students", StudentSchema);

module.exports = StudentModel;
