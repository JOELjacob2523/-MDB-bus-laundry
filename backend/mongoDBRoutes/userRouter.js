const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const CONTORLLER = require("../controller/userInfo");
const { UserModel } = require("./mongoSchema");

//router to singup
router.post("/signup", upload.fields([]), async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    };

    await UserModel.create(newUser);

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user_id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    req.session.token = token;

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
