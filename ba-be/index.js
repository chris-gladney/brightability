const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const photoRoutes = require("./routes/photoRoutes");

const connectDB = require("./config/db");
require("dotenv").config();

connectDB(process.env.MONGO_URI);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", cors(corsOptions), eventRoutes);
app.use("/", cors(corsOptions), paymentRoutes);
app.use("/", cors(corsOptions), photoRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
