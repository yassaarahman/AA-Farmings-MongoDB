const Product = require("../models/products");
const session = require("express-session");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("store/home", {
        products,
        pageTitle: "Home | AA Farmings",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((error) => {
      console.log(`Error came from "getHome" Controller ${error}`);
    });
};

exports.getProducts = (req, res) => {
  Product.find().then((products) => {
    res.render("store/products-list", {
      products,
      pageTitle: "Products | AA Farmings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getProductDetailsByID = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId).then((product) => {
    if (!product) {
      return res.redirect("/products-list");
    }
    res.render("store/product-details", {
      product: product,
      pageTitle: "Details",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

// Cart Controllers
exports.getCart = async (req, res) => {
  const userId = req.session.user.id;
  const user = await User.findById(userId).populate("cart");
  res.render("store/cart", {
    cartProducts: user.cart,
    pageTitle: "Cart",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToCart = async (req, res) => {
  const productId = req.body.id;
  const userId = req.session.user.id;
  const user = await User.findById(userId);
  if (!user.cart.includes(productId)) {
    user.cart.push(productId);
    await user.save();
  }
  return res.redirect("/cart");
};

exports.postRemoveFromCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.session.user.id;
  const user = await User.findById(userId);

  if (user.cart.includes(productId)) {
    user.cart = user.cart.filter((cartProduct) => cartProduct != productId);
    await user.save();
  }

  res.redirect("/cart");
};
