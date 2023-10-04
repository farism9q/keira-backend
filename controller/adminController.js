const Email = require("../utils/email");
const auth = require("../firebaseAdmin");

exports.sendEmail = async (req, res, next) => {
  try {
    const reportAnswer = {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
    };

    await new Email(reportAnswer).sendReportResponded();
    res.status(200).json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteKeiraUser = async (req, res, next) => {
  try {
    // Get id from url
    const userId = req.params.id;

    await auth.deleteUser(userId);

    res.status(204).json({
      status: "success",
      message: null,
    });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else  {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }
};
