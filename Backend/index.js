const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const dbConnect = require("./config/dbConnect");

const PORT = process.env.PORT || 3000;

dbConnect();

app.use("/api/v1/users", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}..`);
});
