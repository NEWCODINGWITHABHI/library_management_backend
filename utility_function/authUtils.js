const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET_KEY = process.env.SECRET_KEY;

const generateJWTToken = (email) => {
  const JWT_TOKEN = jwt.sign({ email: email }, SECRET_KEY, {
    expiresIn: "10d",
  });
  return JWT_TOKEN;
};

const sendVerificationToken = (email, verificationToken) => {
  console.log(email, verificationToken);

  let mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: "abhishekkumar01021995@gmail.com",
      pass: "ttcxwvudcdcwennv",
    },
  });

  let mailOptions = {
    from: "Todo App pvt lmt",
    to: email,
    subject: "Email verification for TODO APP",
    html: `click <a href="http://localhost:8000/verify/${verificationToken}">Here</a>`,
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
