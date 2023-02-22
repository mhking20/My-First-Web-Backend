const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: { type: String, required: [true, "Please provide name"] },
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
  },
  password: { type: String, required: [true, "please provide password"] },
});

module.exports = mongoose.model("Website", User);
