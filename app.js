// Core Modules
const path = require("path");

// External Module
require("dotenv").config();
const express = require("express");
const { Result } = require("postcss");
const session = require("express-session");
const { default: mongoose } = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

// Local Modules
const { adminRouter } = require("./routes/adminRouter");
const storeRouter = require("./routes/storeRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");

// Controller
const errorsController = require("./controllers/404");

// App Body
const app = express();
const DB_PATH = process.env.DB_URL;

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    ["image/jpeg", "image/png", "image/heic", "image/jpg"].includes(
      file.mimetype,
    )
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const multerOptions = { storage, fileFilter };

app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single("image"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));

// Session Midleware
app.use(
  session({
    secret: "AA Farmings",
    resave: false,
    saveUninitialized: true,
    store, // is equal to "store: "store"
  }),
);
// Session Middleware
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(express.json());
app.use(authRouter);
app.use("/admin", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use("/admin", adminRouter);
app.use(storeRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to mongo DB successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/home`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB ", err);
  });
