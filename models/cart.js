const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
