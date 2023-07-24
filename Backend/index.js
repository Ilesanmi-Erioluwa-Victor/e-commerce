const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require('./routes/blogRoute');
const dbConnect = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// DB connection...
dbConnect();
// Middleware...
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", authRoute);
app.use("/api/v1/products", productRoute);
app.use('/api/v1/blogs', blogRoute);

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}..`);
});
