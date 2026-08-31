const Product = require("../models/products");
const fs = require("fs");

exports.getAdminProductList = (req, res) => {
  const products = Product.find().then((products) => {
    res.render("admin/admin-product-list", {
      products,
      pageTitle: "Products",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product | AA-Farmings",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddProduct = (req, res) => {
  const { productName, price, rating, description } = req.body;
  console.log(productName, price, rating, description);
  console.log("Post add product handler ", req.file);
  if (!req.file) {
    return res.status(422).send("<h2> Image not provided </h2>");
  }

  const product = new Product({
    productName,
    price,
    rating,
    image: req.file.filename,
    description,
  });
  product.save().then(() => {
    res.redirect("/admin/admin-product-list");
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.id;
  const editing = req.query.editing === "true";
  Product.findById(productId).then((product) => {
    if (!product) {
      console.log("Product not found for editing!");
      res.redirect("/admin-product-list");
    } else {
      res.render("admin/edit-product", {
        product,
        editing,
        pageTitle: "Edit Product | AA Farmings",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.postEditProduct = (req, res) => {
  const { id, productName, price, rating, description } = req.body;

  Product.findById(id)
    .then((product) => {
      product.productName = productName;
      product.price = price;
      product.rating = rating;
      product.description = description;
      if (req.file) {
        fs.unlink(file.image, (err) => {
          console.log("Error while deleting image ", err);
        });
        product.image = req.file.filename;
      }

      product
        .save()
        .then((result) => {
          console.log("Product updated, ", result);
        })
        .catch((err) => {
          console.log("Error while updating product ", err);
        });
      res.redirect("/admin/admin-product-list");
    })
    .catch((err) => {
      console.log("Error while finding product ", err);
    });
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then(() => {
      console.log("Product deleted successfully");
      res.redirect("/admin/admin-product-list");
    })
    .catch((error) => {
      console.log("Error while deleting product ", error);
    });
};
