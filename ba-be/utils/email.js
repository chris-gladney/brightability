const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  tls: { rejectUnauthorized: false },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailAttendeeSocial = (name, email, event) => {
  // console.log(`Emailing ${email}`);
  // console.log(
  //   `Thanks for your purchase ${name}! We look forward to seeing you at ${event.location} on ${event.date}`
  // );

  return mailTransporter
    .sendMail(
      {
        from: `"Chris Gladney" ${process.env.SMTP_USER}`,
        to: email,
        subject: "Brightability Social Booking",
        text: `Thanks for your purchase ${name}! We look forward to seeing you at ${event.location} on ${event.date}`,
      },
      (error, info) => {
        console.log(error, "<<< error");
        console.log("<<< info");
        if (error) {
          console.error("Error sending email");
        } else {
          console.info("email sent: " + info);
        }
      }
    )
    .catch((err) => {
      console.error(err, "<<< within email function");
    });
};

module.exports = { emailAttendeeSocial };
