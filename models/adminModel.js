const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"], // checks if the provided email is valid or not
  },
  password: {
    type: String,
    required: [true, "MUST have a password"],
    minlength: [8, "Password Must be at least 8 char or number"],
    select: false, // this will not allow password value to be visiable when requesting a document
  },
  role: {
    type: String,
    required: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
