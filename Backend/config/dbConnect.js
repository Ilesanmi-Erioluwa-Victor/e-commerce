const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = mongoose.connect("mongodb://localhost:27017+");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
