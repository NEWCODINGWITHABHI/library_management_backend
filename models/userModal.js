const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    emailAuthenticated: {
      type: Boolean,
      require: true,
      default: false,
    },
    resetPassword: {
      type: Boolean,
      // require: false,
      default: false,
    },
  },
  { strict: false }
);

module.exports = new mongoose.model("users", userSchema);
