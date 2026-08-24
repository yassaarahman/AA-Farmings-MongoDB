const Product = require("../models/products");
const Cart = require("../models/cart");
const session = require("express-session");

exports.getHome = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("store/home", {
        products,
        pageTitle: "Home | AA Farmings",
        isLoggedIn: req.session.isLoggedIn,
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
    });
  });
};

exports.getCart = (req, res) => {
  Cart.find()
    .populate("productID")
    .then((cart) => {
      const cartProducts = cart.map((product) => {
        return product.productID;
      });
      res.render("store/cart", {
        cartProducts,
        pageTitle: "Cart",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postAddToCart = (req, res) => {
  const productId = req.body.id;
  Cart.findOne({ productID: productId }).then((cartProduct) => {
    if (cartProduct) {
      console.log("Product already in Cart");
    } else {
      const product = new Cart({ productID: productId });
      product.save().then((result) => {
        console.log("Product added successfully ", result);
      });
    }
    return res.redirect("/cart");
  });
};

exports.postRemoveFromCart = (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  Cart.findOneAndDelete({ productID: productId })
    .then(() => {
      console.log("Product removed successfully");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("Error occured while removing item from cart ", err);
    });
};
