const path = require("path");

const express = require("express");
// to get access to our cookies in any request
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminRouter = require("./routers/adminRouter");
const openAIRouter = require("./routers/openAIRouter");

const app = express();

app.use(cors());

// converts the body to json format
app.use(express.json());
app.use(cookieParser());

// Middleware for "admin" routes
app.use("/api/v1/admin", adminRouter);

// Middleware for "openai" routes
app.use("/api/v1/openai", openAIRouter);

// this middleware will run if the request url is not found
app.all("*", (req, res, next) =>
  next(`can't find ${req.originalUrl} in this server`)
);

module.exports = app;
