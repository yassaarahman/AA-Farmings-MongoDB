const express = require("express");
const storeRouter = express.Router();
const {
  getHome,
  getProducts,
  getProductDetailsByID,
  getCart,
  postAddToCart,
  postRemoveFromCart,
} = require("../controllers/storeController");

storeRouter.get("/home", getHome);
storeRouter.get("/products-list", getProducts);
storeRouter.get("/products-list/:id", getProductDetailsByID);
storeRouter.get("/cart", getCart);
storeRouter.post("/cart", postAddToCart);
storeRouter.post("/cart/delete/:id", postRemoveFromCart);

module.exports = storeRouter;
