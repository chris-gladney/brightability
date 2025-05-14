const express = require("express");
const app = express();
const PORT = 3000;

const eventRoutes = require("./routes/eventRoutes");

const connectDB = require("./config/db");
require("dotenv").config();

connectDB(process.env.MONGO_URI);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/social", eventRoutes);
app.post("/connect", eventRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
