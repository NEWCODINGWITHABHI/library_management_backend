const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = new mongoose.model("books", bookSchema);
