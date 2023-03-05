const mongoose = require("mongoose");

const Task_Manager_model = mongoose.Schema(
  {
    Task: { type: String },
    User: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task_Manager", Task_Manager_model);
