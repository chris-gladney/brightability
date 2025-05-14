const { default: mongoose } = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  zoomLink: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
