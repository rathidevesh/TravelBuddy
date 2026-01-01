const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,     // your email
        pass: process.env.MAIL_PASS      // app password
      }
    });

    await transporter.sendMail({
      from: `"Car Rental System" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error.message);
  }
};

module.exports = sendMail;
