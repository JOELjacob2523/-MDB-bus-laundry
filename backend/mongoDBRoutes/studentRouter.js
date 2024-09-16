const router = require("express").Router();
const {
  StudentModel,
  PaymentModel,
  ZmanGoalModel,
  OldZmanGoalModel,
} = require("./mongoSchema");
const multer = require("multer");
const upload = multer();

router.post("/student_info", upload.fields([]), async (req, res, next) => {
  try {
    await StudentModel.create(req.body);
    res.status(200).json({
      message: "Student created successfully",
      token: req.session.token,
    });
  } catch (err) {
    console.error("Error inserting student credentials:", err);
    res
      .status(500)
      .json({ message: "Error creating student", error: err.message });
  }
});

// router get all student info
router.get("/get_all_user_info", async (req, res, next) => {
  try {
    let userInfo = await StudentModel.find({});
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error getting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get student info by ID
router.get("/get_user_info", async (req, res, next) => {
  try {
    const { _id } = req.query;
    const userInfo = await StudentModel.findById(_id);
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to update a student
router.post("/update_user_info", upload.fields([]), async (req, res, next) => {
  try {
    const { _id } = req.body;
    const userInfo = await StudentModel.findByIdAndUpdate(_id, req.body);
    // req.session.student_id = student_id;
    console.log(userInfo);
    res.status(200).json({
      message: "User updated successfully",
      token: req.session.token,
    });
  } catch (err) {
    console.error("Error updating user credentials:", err);
    res.status(500).json({ message: "Error updaing user", error: err.message });
  }
});

// router to delete a student
router.post("/delete_user", async (req, res, next) => {
  try {
    const { _id } = req.body;
    await StudentModel.deleteOne({ _id: _id });
    // req.session.user_id = user_id;
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user credentials:", err);
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

// router to post payment info
router.post("/payments", async (req, res, next) => {
  try {
    let payments = await PaymentModel.create(req.body);
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error inserting payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to get payment info
router.get("/payments", async (req, res, next) => {
  try {
    let payments = await PaymentModel.find({});
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error getting payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to create the zman goal
router.post("/zman_goal", upload.fields([]), async (req, res, next) => {
  try {
    const zmanGoal = await ZmanGoalModel.find({});

    if (zmanGoal.length > 0) {
      await OldZmanGoalModel.insertMany(zmanGoal);
    }
    await ZmanGoalModel.deleteMany({});

    await ZmanGoalModel.create(req.body);
    res.status(200).json({ message: "Zman goal created successfully" });
  } catch (err) {
    console.error("Error inserting zman goal credentials:", err);
    res
      .status(500)
      .json({ message: "Error inserting zman goal", error: err.message });
  }
});

// router to get zman goal info
router.get("/zman_goal", async (req, res, next) => {
  try {
    let zmanGoal = await ZmanGoalModel.find({});
    res.status(200).json(zmanGoal);
  } catch (err) {
    console.error("Error getting payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
