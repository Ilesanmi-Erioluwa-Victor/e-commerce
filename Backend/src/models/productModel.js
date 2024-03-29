const mongoose = require('mongoose');

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
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Category',
      type: String,
      required : true
    },
    quantity: {
      type: Number,
      required: true,
    },

    images: {
      type: Array,
    },
    brand: {
      required: true,
      // enum: [
      //   'Apple',
      //   'Samsung',
      //   'Philips',
      //   'Lenovo',
      //   'Nokia',
      //   'Techno',
      //   'Infinix',
      //   'Redmi'
      // ],
      type : String
    },
    sold: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
      // enum: ['Black', 'Brown', 'Red'],
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
