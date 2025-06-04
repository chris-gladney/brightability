const { mongoose } = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const ConnectEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  zoomLink: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attendees: [AttendeeSchema],
});

module.exports = mongoose.model("ConnectEvent", ConnectEventSchema);