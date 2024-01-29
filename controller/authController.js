const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const signToken = id => {
  // First argument is the payload, second argument is the secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    // expiresIn: "30s", // for testing
  });
};

const createSendToken = function(admin, status, res) {
  const token = signToken(admin._id);

  // Remove password from output
  admin.password = undefined;

  // The date where the token will expire
  const tokenExpiresIn = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * parseInt(process.env.JWT_EXPIRES_IN)
  );

  res.status(status).json({
    status: "success",
    token,
    tokenExpiresIn,
    data: {
      admin,
    },
  });
};

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newAdmin = await Admin.create({
      email, // email: email
      password,
    });
    res.status(201).json({
      status: "success",
      data: {
        admin: newAdmin,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select("+password"); // We need to select the password because we set the password to be hidden in the adminModel.js

    if (!admin || password !== admin.password) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    createSendToken(admin, 200, res);
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

// This for only for postman testing
exports.logout = (req, res) => {
  req.headers.authorization = "Bearer loggedout";

  res.status(200).json({
    status: "success",
    token: req.headers.authorization,
  });
};

// middleware for protected resources (the user admin logged in for accessing a protected routes, ex: delete a user or send an email to a user)
exports.protect = async (req, res, next) => {
  let token;

  // 1) Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // we send the token within http header, So to get the token we have to do the following:
    token = req.headers.authorization.split(" ")[1]; // Bearer token --> [ Bearer, token ] --> token
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  // if token has expired, then we have to send an error
  if (!decoded) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token. Try to login again.",
    });
  }

  // 3) Check if the admin is exist
  const admin = await Admin.findById(decoded.id); // here we are checking if the admin is exist. We took the id from payload and with that id we searched for a record of that id, and if doesn't exist, then we have to send an error
  if (!admin)
    return res.status(401).json({
      status: "fail",
      message: "The admin belonging to this token doesn't exist.",
    });

  // pass admin data to next middleware, so we can get access to the admin data in the next middleware ( for example: restrictTo middleware )
  req.admin = admin;

  next();
};

// This middleware will be used before any route that needs to be restricted to a specific role (ex, if role: admin).
// For example, the admin can only delete + send an email to a user
exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.admin.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

exports.checkRole = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "You have permission to perform this action",
  });
};
