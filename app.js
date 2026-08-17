// Core Modules
const path = require("path");

// External Module
const express = require("express");
const { Result } = require("postcss");

// Local Modules
const { adminRouter } = require("./routes/adminRouter");
const storeRouter = require("./routes/storeRouter");
const rootDir = require("./utils/pathUtil");
const { default: mongoose } = require("mongoose");

// Controller
const errorsController = require("./controllers/404");
const { log } = require("console");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(adminRouter);
app.use(storeRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;
const DB_PATH =
  "mongodb://user:user@ac-wn1imgd-shard-00-00.dpdyonr.mongodb.net:27017,ac-wn1imgd-shard-00-01.dpdyonr.mongodb.net:27017,ac-wn1imgd-shard-00-02.dpdyonr.mongodb.net:27017/aa-farmings?ssl=true&replicaSet=atlas-7ecux2-shard-0&authSource=admin&appName=Cluster0";
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
