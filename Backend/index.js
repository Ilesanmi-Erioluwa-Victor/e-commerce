const express = require("express");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const dbConnect = require("./config/dbConnect");

// DB connection...
dbConnect();

const app = express();
app.use(express.json());

app.use("/api/v1/users", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}..`);
});
