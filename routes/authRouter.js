const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.get("/signup", getSignup);
authRouter.post("/signup", postSignup);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogout);

module.exports = authRouter;
