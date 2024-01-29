const express = require("express");
const authController = require("../controller/authController");
const openAIController = require("../controller/openaiController");

const openAIRouter = express.Router();

openAIRouter.use(authController.protect);

openAIRouter.post(
  "/generateBestResponse",
  openAIController.generateBestResponse
);

module.exports = openAIRouter;
