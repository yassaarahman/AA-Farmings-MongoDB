const express = require("express");
const adminRouter = express.Router();
const {
  getAdminProductList,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/adminController");

adminRouter.get("/admin-home", (req, res, next) => {
  res.render("admin/admin-home", {
    pageTitle: "Home | Admin",
    isLoggedIn: req.isLoggedIn,
  });
});

adminRouter.get("/admin-product-list", getAdminProductList);

adminRouter.get("/add-product", getAddProduct);
adminRouter.post("/add-product", postAddProduct);

adminRouter.get("/edit-product/:id", getEditProduct);
adminRouter.post("/edit-product/:id", postEditProduct);
adminRouter.post("/delete-product/:id", postDeleteProduct);

exports.adminRouter = adminRouter;
