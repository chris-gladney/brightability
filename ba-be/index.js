const express = require("express");
const app = express();
const PORT = 3000;

const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const connectDB = require("./config/db");
require("dotenv").config();

connectDB(process.env.MONGO_URI);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", eventRoutes);
app.use("/", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
