const router = require("express").Router();
const StudentModel = require("./mongoSchema");
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
    let userInfo = await StudentModel.find();
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
