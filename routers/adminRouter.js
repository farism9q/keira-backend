const express = require("express");
const adminController = require("../controller/adminController");
const authController = require("../controller/authController");

const adminRouter = express.Router();

adminRouter.post("/signup", authController.signup);
adminRouter.post("/login", authController.login);
adminRouter.use(authController.protect);

adminRouter.get("/logout", authController.logout);

// Will be a good idea to add a route to check if the admin is allowed to access a certain
// route or not because some functions like "delete a car" doesn't check if the admin is allowed.
// Because deleting a car is done in firestore and we can delete the car without checking the admin's role, which we don't want
// So this route will be called in the front-end before deleting a car. Before hitting this route, we will check if
// the user is logged in or not + if the role is admin or not
adminRouter.get(
  "/checkRole",
  authController.restrictTo("admin"),
  authController.checkRole
);

adminRouter.post(
  "/sendEmail",
  authController.restrictTo("admin", "assistant"),
  adminController.sendEmail
);
adminRouter.delete(
  "/deleteKeiraUser/:id",
  authController.restrictTo("admin"),
  adminController.deleteKeiraUser
);

module.exports = adminRouter;
