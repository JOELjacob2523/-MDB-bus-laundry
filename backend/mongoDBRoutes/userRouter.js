const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const CONTORLLER = require("../controller/userInfo");
const { UserModel } = require("./mongoSchema");
const nodemailer = require("nodemailer");
const CONFIG = require("../config.json");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
require("@babel/register")({
  presets: ["@babel/preset-react"],
});
const EmailTemplate = require("../emailTamplate/emailTamplate");

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

router.get("/check_auth", async (req, res) => {
  if (req.session && req.session.token) {
    try {
      const decoded = jwt.verify(req.session.token, SECRET_KEY);

      const user = await UserModel.findById(decoded.user_id);
      return res.status(200).json({
        message: "Authenticated",
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    } catch (err) {
      console.error("Error decoding JWT:", err);
      return res.status(400).json({ message: "Invalid token" });
    }
  }
  res.status(401).json({ message: "Unauthorized" });
});

// router to login
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
      return res.status(401).json({ message: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
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

//function to create confirmation number
function generateConfirmationNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

router.post("/forgot_password", upload.fields([]), async (req, res, next) => {
  try {
    const { email } = req.body;
    const confirmationNumber = generateConfirmationNumber();

    await UserModel.updateOne({ email }, { $set: { confirmationNumber } });

    const emailContent = ReactDOMServer.renderToStaticMarkup(
      React.createElement(EmailTemplate, { confirmationNumber })
    );

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jsjprog4119@gmail.com",
        pass: CONFIG.EMAIL_PASS,
      },
    });

    // Email content
    let mailOptions = {
      from: "jsjprog4119@gmail.com",
      to: email,
      subject: "Password Reset Confirmation",
      html: emailContent,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

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

    const user = await UserModel.findOne({ confirmationNumber });

    if (!user) {
      return res.status(400).json({ message: "Invalid confirmation number" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);

    await UserModel.updateOne(
      { email: user.email },
      { $set: { password: hashedPassword, confirmationNumber: null } }
    );

    req.session.confirmationNumber = null;
    req.session.email = null;

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
