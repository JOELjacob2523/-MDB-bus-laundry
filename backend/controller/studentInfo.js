require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const { HDate, HebrewDateEvent } = require("@hebcal/core");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  insertUserInfo,
  getAllUserInfo,
  getUserInfoById,
  updateUserInfo,
  deleteUser,
  insertZmanGoalInfo,
  getAllZmanGoalInfo,
  insertPaymentInfo,
  getAllPaymentInfo,
  migrateOldData,
  migrateOldZmanGoalData,
  insertWithdrawalInfo,
  getAllWithdrawalInfo,
  getOldPaymentsInfo,
  getOldStudentsInfo,
  getOldZmanGoalInfo,
};

async function insertUserInfo(userInfo) {
  try {
    const [studentId] = await knex("students").insert({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      age: userInfo.age,
      address1: userInfo.address1,
      address2: userInfo.address2,
      city: userInfo.city,
      state: userInfo.state,
      zip_code: userInfo.zip_code,
      date: new Date(),
      phone: userInfo.phone,
    });

    const token = jwt.sign({ student_id: studentId }, SECRET_KEY, {
      expiresIn: "1h",
    });
    await knex("students").where({ student_id: studentId }).update({ token });

    return { studentId, token };
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}

async function getAllUserInfo() {
  return await knex("students").select();
}

async function getUserInfoById(id) {
  return await knex("students").select().where("student_id", id).first();
}

async function updateUserInfo(student) {
  const {
    student_id,
    first_name,
    last_name,
    age,
    address1,
    address2,
    city,
    state,
    zip_code,
    phone,
  } = student;
  return knex("students").where("student_id", student_id).update({
    first_name,
    last_name,
    age,
    address1,
    address2,
    city,
    state,
    zip_code,
    phone,
  });
}

async function deleteUser(id) {
  return await knex("students").where("student_id", id).del();
}

async function insertZmanGoalInfo(zmanInfo) {
  try {
    await knex("zman_goal").insert({
      zman: zmanInfo.zman,
      zman_starts_ends: JSON.stringify(zmanInfo.zman_starts_ends),
      closed_weeks: JSON.stringify(zmanInfo.closed_weeks),
      bus_price: zmanInfo.bus_price,
      wash_price: zmanInfo.wash_price,
      total_zman_weeks: zmanInfo.total_zman_weeks,
      total_zman_goal: zmanInfo.total_zman_goal,
      total_bus_goal: zmanInfo.total_bus_goal,
      total_wash_goal: zmanInfo.total_wash_goal,
    });
  } catch (error) {
    console.error("Error inserting zman goal info:", error);
    throw error;
  }
}

async function getAllZmanGoalInfo() {
  return await knex("zman_goal").select();
}

async function insertPaymentInfo(paymentInfo) {
  const hd = new HDate(new Date());
  const ev = new HebrewDateEvent(hd);

  const hebrewDate = ev.render("he-x-NoNikud");

  const paymentTypes = {
    bus: paymentInfo.payment_type === "bus",
    wash: paymentInfo.payment_type === "wash",
    bus_wash: paymentInfo.payment_type === "bus_wash",
  };
  try {
    const [payment_id] = await knex("payments").insert({
      first_name: paymentInfo.first_name,
      last_name: paymentInfo.last_name,
      bus: paymentTypes.bus,
      wash: paymentTypes.wash,
      bus_wash: paymentTypes.bus_wash,
      payment_type: paymentInfo.payment_type,
      cash: paymentInfo.cash,
      checks: paymentInfo.checks,
      credit_card: paymentInfo.credit_card,
      student_id: paymentInfo.student_id,
      total_paid: paymentInfo.total_paid,
      pay_date: hebrewDate,
      date: new Date(),
    });

    const token = jwt.sign({ payment_id: payment_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    await knex("payments").where({ payment_id: payment_id }).update({ token });

    return { payment_id, token };
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}

async function getAllPaymentInfo() {
  return await knex("payments").select();
}

//archiving old data into old data tables
async function migrateOldZmanGoalData() {
  try {
    let zmanGoals = await knex("zman_goal").select();

    let closedWeeks = zmanGoals[0]?.closed_weeks;

    for (const goal of zmanGoals) {
      const zmanGoalData = {
        zman: goal.zman,
        zman_starts_ends: goal.zman_starts_ends,
        closed_weeks: JSON.stringify(closedWeeks),
        bus_price: goal.bus_price,
        wash_price: goal.wash_price,
        total_zman_weeks: goal.total_zman_weeks,
        total_zman_goal: goal.total_zman_goal,
        total_bus_goal: goal.total_bus_goal,
        total_wash_goal: goal.total_wash_goal,
      };
      await knex("old_zman_goal").insert(zmanGoalData);
    }

    //removing safty mode while deleting old data
    await knex.transaction(async (trx) => {
      await trx.raw("SET FOREIGN_KEY_CHECKS = 0");

      await knex("zman_goal").del();

      //returning safty mode after deleting old data
      await trx.raw("SET FOREIGN_KEY_CHECKS = 1");
    });
    console.log("Data migration completed successfully.");
  } catch (error) {
    console.error("Error migrating data:", error);
    throw error;
  }
}

async function migrateOldData(selectedStudents) {
  try {
    await knex.transaction(async (trx) => {
      let payments = await trx("payments")
        .whereIn("student_id", selectedStudents)
        .select();
      let students = await trx("students")
        .whereIn("student_id", selectedStudents)
        .select();

      for (const name of students) {
        const studentData = {
          student_id: name.student_id,
          first_name: name.first_name,
          last_name: name.last_name,
          age: name.age,
          address1: name.address1,
          address2: name.address2,
          city: name.city,
          state: name.state,
          zip_code: name.zip_code,
          phone: name.phone,
          token: name.token,
          date: name.date,
        };
        await trx("old_students").insert(studentData);
      }
      for (const pay of payments) {
        const paymentData = {
          first_name: pay.first_name,
          last_name: pay.last_name,
          bus: pay.bus,
          wash: pay.wash,
          bus_wash: pay.bus_wash,
          cash: pay.cash,
          checks: pay.checks,
          credit_card: pay.credit_card,
          total_paid: pay.total_paid,
          token: pay.token,
          student_id: pay.student_id,
          payment_type: pay.payment_type,
          pay_date: pay.pay_date,
          date: pay.date,
        };
        await trx("old_payments").insert(paymentData);
      }

      //removing safty mode while deleting old data
      await trx.raw("SET FOREIGN_KEY_CHECKS = 0");

      await trx("payments").whereIn("student_id", selectedStudents).del();
      await trx("students").whereIn("student_id", selectedStudents).del();

      //returning safty mode after deleting old data
      await trx.raw("SET FOREIGN_KEY_CHECKS = 1");

      console.log("Data migration completed successfully.");
    });
  } catch (error) {
    console.error("Error migrating data:", error);
    throw error;
  }
}

//insert withdrawal data
async function insertWithdrawalInfo(withdrawalInfo) {
  try {
    await knex("withdrawals").insert({
      amount: withdrawalInfo.amount,
      withdrawal_to: withdrawalInfo.withdrawal_to,
      date: withdrawalInfo.date,
      hebrew_date: withdrawalInfo.hebrew_date,
      user_id: withdrawalInfo.user_id,
    });
  } catch (error) {
    console.error("Error inserting withdarwal info:", error);
    throw error;
  }
}

//get withdrawal information
async function getAllWithdrawalInfo() {
  return await knex("withdrawals").select();
}

//get old zman goal information
async function getOldZmanGoalInfo() {
  return await knex("old_zman_goal").select();
}

//get old payments information
async function getOldPaymentsInfo() {
  return await knex("old_payments").select();
}

//get old students information
async function getOldStudentsInfo() {
  return await knex("old_students").select();
}
