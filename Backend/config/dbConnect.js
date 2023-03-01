const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
      mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("DB Successfully connected..")
    } catch (error) {
      console.log(error.message);
    }
};

module.exports = dbConnect;
