const mongoose = require("mongoose");
const Cart = require("./cart");

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

productSchema.pre("findOneAndDelete", async function (next) {
  const productId = this.getQuery()._id;
  await Cart.deleteMany({ productID: productId });
  next;
});

module.exports = mongoose.model("Product", productSchema);

/* 

save()
find()
fetchProductById()
deleteByProductId()

*/
