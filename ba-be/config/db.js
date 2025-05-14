const mongoose = require("mongoose");

async function connectDB(URI) {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
