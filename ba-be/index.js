const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const photoRoutes = require("./routes/photoRoutes");
const adminPhotoRoutes = require("./routes/adminPhotoRoutes");
const adminRoutesSocial = require("./routes/adminRoutesSocial");
const adminRoutesConnect = require("./routes/adminRoutesConnect");
const adminRoutesStaff = require("./routes/adminRoutesStaff")

const connectDB = require("./config/db");
require("dotenv").config();

connectDB(process.env.MONGO_URI);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/admin/images", adminPhotoRoutes);

app.use(express.json());
app.use("/admin/social", adminRoutesSocial);
app.use("/admin/connect", adminRoutesConnect);
app.use("/admin/staff", adminRoutesStaff)

app.use("/events", eventRoutes);
app.use("/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
