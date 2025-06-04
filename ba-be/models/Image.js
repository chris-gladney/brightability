const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", imageSchema);
