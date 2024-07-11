const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// app routes
const authRouter = require("./routes/auth/auth.route")

// db config
// const postgresqlFn = require("./postgresql");

// postgresqlFn();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all requests
app.use(morgan("dev")); // Log all requests to the console

// Basic route
app.get("/", (req, res) => {
    try {
      return res.status(200).json({
        message: " Welcome to the Big Org API",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

//   Auth routes
  app.use("/api/auth", authRouter)
  
  // Unknown route handler
  app.use((req, res) => {
    return res.status(404).json({
      message: "Route not found",
    });
  });

module.exports = app;
