const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      trim: true,
      type: String,
    },

    slug: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    quantity: {
      type: Number
    },

    images: {
      type: Array,
    },
    color: {
        type: String,
        enum : ["Black", "Brown", "Red"]
    },
    ratings: [
      {
            star: Number,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
      },
    ],

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
