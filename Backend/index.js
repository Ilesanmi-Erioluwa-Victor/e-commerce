const express = require("express");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const dbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");

const app = express();

// DB connection...
dbConnect();
// Middleware...
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.use("/api/v1/users", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}..`);
});
