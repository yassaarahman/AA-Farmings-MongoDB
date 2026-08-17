const Product = require("../models/products");

exports.getAdminProductList = (req, res) => {
  const products = Product.find().then((products) => {
    res.render("admin/admin-product-list", {
      products,
      pageTitle: "Products",
    });
  });
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product | AA-Farmings",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { productName, price, rating, imageUrl, description } = req.body;
  const product = new Product({
    productName,
    price,
    rating,
    imageUrl,
    description,
  });
  product.save().then(() => {
    res.redirect("/admin-product-list");
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
      });
    }
  });
};

exports.postEditProduct = (req, res) => {
  const { id, productName, price, rating, imageUrl, description } = req.body;
  Product.findById(id)
    .then((product) => {
      product.productName = productName;
      product.price = price;
      product.rating = rating;
      product.imageUrl = imageUrl;
      product.description = description;
      product
        .save()
        .then((result) => {
          console.log("Product updated, ", result);
        })
        .catch((err) => {
          console.log("Error while updating product ", err);
        });
      res.redirect("/admin-product-list");
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
      res.redirect("/admin-product-list");
    })
    .catch((error) => {
      console.log("Error while deleting product ", error);
    });
};
