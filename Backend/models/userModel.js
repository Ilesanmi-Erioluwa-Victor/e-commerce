const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, "First name is required"],
    type: String,
  },

  lastName: {
    required: [true, "Last name is required"],
    type: String,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// encrypting of password...
userSchema.pre("save", async function (next) {
  
  next();
});
//Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
