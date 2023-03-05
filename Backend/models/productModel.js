const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    cart: {
      type: Array,
      default: [],
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    refreshToken: {
      type : String,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
