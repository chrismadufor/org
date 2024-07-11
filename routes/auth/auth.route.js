const express = require("express");
const authRouter = express.Router();

const { register, login } = require("./auth.controller");

// Register a new user
authRouter.get("/test", (req, res) => {
  try {
    return res.status(200).json({
      message: " Welcome to the Big Org API ---test",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

authRouter.post("/register", register);

// Login a user
authRouter.post("/login", login);

module.exports = authRouter;
