const express = require("express");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const dbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// DB connection...
dbConnect();
// Middleware...
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/users", authRoute);

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}..`);
});
