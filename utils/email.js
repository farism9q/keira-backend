const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

// we will import this calss whenever we want to send an email
module.exports = class Email {
  constructor(reportAnswer) {
    this.to = reportAnswer.email;
    this.firstName = reportAnswer.name.split(" ")[0];
    this.from = `Keira-team <${process.env.EMAIL_FROM}>`;
    this.comment = reportAnswer.comment;
  }

  newTransport() {
    // in production enviroment we will use "sendGrid" to send real email
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "SendGrid", // this is the name of the service we will use
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // 1) create a transporter
    // In development enviroment we will use "mailtrap" to send fake email
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async _send(subject) {
    // 1) Render HTML based on a Pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/reportResponse.pug`,
      {
        // We need these variables to be passed to the pug file
        firstName: this.firstName,
        comment: this.comment,
        emailFrom: process.env.EMAIL_FROM,
      }
    );
    const mailOptions = {
      from: this.from.split("<")[1].split(">")[0], // get the email only
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html), // some people prefer only text, so we should fill their needs and convert html to text
    };


    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendReportResponded() {
    await this._send("كيرا - تم الرد على شكواك");
  }
};
