const express = require("express");
const app = express();
const session = require("express-session");
const CONFIG = require("./config.json");
const cors = require("cors");
const studentInfoRouter = require("./routes/studentRouter");
const userRouter = require("./routes/userRouter");
const MDBuserRouter = require("./mongoDBRoutes/userRouter");
const bodyParser = require("body-parser");
const studentRouter = require("./mongoDBRoutes/studentRouter");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(cors());

// app.use("/", userRouter);
app.use("/", MDBuserRouter);
app.use("/student", studentInfoRouter);
app.use("/mdb/student", studentRouter);

app.listen(CONFIG.PORT, () => {
  console.log(`Server listening on port ${CONFIG.PORT}`);
});
