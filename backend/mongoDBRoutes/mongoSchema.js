const mongoose = require("mongoose");
const connectDB = require("./mongoDBConnection");
const { HDate, HebrewDateEvent } = require("@hebcal/core");

connectDB();

const getHebrewDate = () => {
  const hd = new HDate(new Date());
  const ev = new HebrewDateEvent(hd);
  return ev.render("he-x-NoNikud");
};

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  confirmationNumber: Number,
  token: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const StudentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip_code: Number,
  phone: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const PaymentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  bus: String,
  wash: String,
  bus_wash: String,
  cash: String,
  checks: String,
  credit_card: String,
  total_paid: String,
  token: String,
  payment_type: String,
  pay_date: {
    type: String,
    default: getHebrewDate,
  },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
  date: {
    type: Date,
    default: new Date(),
  },
});

const ZmanGoalSchema = new mongoose.Schema(
  {
    zman: String,
    zman_starts_ends: [
      {
        start: {
          jewishDateStr: String,
          jewishDateStrHebrew: String,
          jewishDate: Object,
          date: Date,
        },
        end: {
          jewishDateStr: String,
          jewishDateStrHebrew: String,
          jewishDate: Object,
          date: Date,
        },
      },
    ],
    closed_weeks: [
      {
        id: String,
        date: Date,
        sedra: String,
      },
    ],
    bus_price: String,
    wash_price: String,
    total_zman_weeks: String,
    total_zman_goal: String,
    total_bus_goal: String,
    total_wash_goal: String,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "zman_goal",
  }
);

const WithdrawalSchema = new mongoose.Schema({
  amount: Number,
  withdrawal_to: String,
  date: String,
  hebrew_date: String,
  username: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const OldStudentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip_code: Number,
  phone: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const OldPaymentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  bus: String,
  wash: String,
  bus_wash: String,
  cash: String,
  checks: String,
  credit_card: String,
  total_paid: String,
  token: String,
  payment_type: String,
  pay_date: {
    type: String,
    default: getHebrewDate,
  },
  student_id: Number,
  date: {
    type: Date,
    default: new Date(),
  },
});

const OldZmanGoalSchema = new mongoose.Schema(
  {
    zman: String,
    zman_starts_ends: {
      type: [String],
      default: [],
    },
    closed_weeks: {
      type: [String],
      default: [],
    },
    bus_price: String,
    wash_price: String,
    total_zman_weeks: String,
    total_zman_goal: String,
    total_bus_goal: String,
    total_wash_goal: String,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "old_zman_goal",
  }
);

const UserModel = mongoose.model("users", UserSchema);
const StudentModel = mongoose.model("students", StudentSchema);
const PaymentModel = mongoose.model("payments", PaymentSchema);
const ZmanGoalModel = mongoose.model("zman_goal", ZmanGoalSchema);
const WithdrawalModel = mongoose.model("withdrawals", WithdrawalSchema);
const OldStudentModel = mongoose.model("old_students", OldStudentSchema);
const OldPaymentModel = mongoose.model("old_payments", OldPaymentSchema);
const OldZmanGoalModel = mongoose.model("old_zman_goal", OldZmanGoalSchema);

module.exports = {
  UserModel,
  StudentModel,
  PaymentModel,
  ZmanGoalModel,
  WithdrawalModel,
  OldStudentModel,
  OldPaymentModel,
  OldZmanGoalModel,
};
