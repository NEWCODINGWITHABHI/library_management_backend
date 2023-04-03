const jwt = require("jsonwebtoken");
function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET);
}

module.exports = generateAccessToken;
