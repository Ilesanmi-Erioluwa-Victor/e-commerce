const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const { db } = require("./models/userModel");

db()
const PORT = process.env.PORT || 3000;

app.use("/api/v1/users", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}..`);
});
