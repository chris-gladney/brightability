const { mongoose } = require("mongoose");

const StaffSchema = new mongoose.Schema({
  name: String,
  job: String,
  description: String,
});

module.exports = mongoose.model("Staff", StaffSchema);
