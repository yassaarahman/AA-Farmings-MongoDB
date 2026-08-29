const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
