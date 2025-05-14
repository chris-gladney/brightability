const mongoose = require("mongoose");

async function connectDB(connectionString) {
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
