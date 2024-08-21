const router = require("express").Router();
const CONTORLLER = require("../controller/userInfo");
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// const { Builder, By, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

//router to singup
router.post("/signup", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.createUser(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

router.get("/check_auth", (req, res) => {
  if (req.session && req.session.token) {
    const decoded = jwt.verify(req.session.token, SECRET_KEY);
    return res
      .status(200)
      .json({ message: "Authenticated", user_id: Number(decoded.user_id) });
  }
  res.status(401).json({ message: "Unauthorized" });
});

router.post("/login", upload.fields([]), async (req, res, next) => {
  try {
    const { user, token } = await CONTORLLER.confirmUser(
      req,
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      message: "User confirmed successfully",
      token: req.session.token,
    });
  } catch (err) {
    console.error("Error confirming user credentials:", err);
    res
      .status(500)
      .json({ message: "Error confirming user", error: err.message });
  }
});

router.post("/forgot_password", upload.fields([]), async (req, res, next) => {
  try {
    const { email } = req.body;
    await CONTORLLER.sendEmail(email);
    res.status(200).json({
      message: "Email send successfully",
    });
  } catch (err) {
    console.error("Error confirming email sending:", err);
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
});

router.post("/reset_password", upload.fields([]), async (req, res, next) => {
  try {
    const { newPassword, confirmationNumber } = req.body;
    await CONTORLLER.resetPassword(newPassword, confirmationNumber);
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Error reseting password:", err);
    res
      .status(500)
      .json({ message: "Error reseting password", error: err.message });
  }
});

module.exports = router;
