const { mongoose } = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const SocialEventSchema = new mongoose.Schema({
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
  attendees: [AttendeeSchema],
});

module.exports = mongoose.model("SocialEvent", SocialEventSchema);
