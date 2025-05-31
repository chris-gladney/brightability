const nodemailer = require("nodemailer");

const emailAttendeeSocial = (email, name, eventObj) => {
  return nodemailer
    .createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    .then((data) => {
      console.log(data);
    });
};

module.exports = { emailAttendeeSocial };
