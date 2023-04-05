const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET_KEY = process.env.SECRET_KEY;

const generateJWTToken = (email) => {
  const JWT_TOKEN = jwt.sign({ email: email }, SECRET_KEY, {
    expiresIn: "10d",
  });
  return JWT_TOKEN;
};

const sendVerificationToken = ({ email, verificationToken }) => {
  console.log(
    "email...",
    email,
    "vtoken",
    verificationToken,
    "secret key",
    SECRET_KEY
  );

  let mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 8000,
    secure: true,
    service: "Gmail",
    auth: {
      user: "abhishekkumar01021995@gmail.com",
      pass: "czldgichihcgwkqx",
    },
  });

  let mailOptions = {
    from: "Library Management ",
    to: email,
    subject: "Email verification for Library Management application",
    html: `click the below link to verify your email<a href="https://librarymanagementbackend-production.up.railway.app/verify/${verificationToken}">Here</a>`,
  };

  mailer.sendMail(mailOptions, function (err, response) {
    if (err) throw err;
    else console.log("Mail has been sent successfully");
  });
};

module.exports = {
  generateJWTToken,
  sendVerificationToken,
};

// user: "abhishekkumar01021995@gmail.com",
// pass: "czldgichihcgwkqx",
