const express = require("express");
const router = express.Router();
const ProductModel = require("../models/productsModel");
const User = require("../controllers/usersController");
const Product = require("../controllers/productsController");
const { isAdmin, isLogin } = require("../utils/middlewares");

router.get("/", async (req, res) => {
  if (req.session.error) {
    res.locals.error = req.session.error;
    req.session.error = null;
  }
  const products = await ProductModel.find();
  res.render("index", { products: products, user: req.session.user });
});

router.get("/login", async (req, res) => {
  if (req.session.error) {
    res.locals.error = req.session.error;
    req.session.error = null;
  }
  res.render("login", { user: req.session.user });
});

router.get("/register", async (req, res) => {
  if (req.session.error) {
    res.locals.error = req.session.error;
    req.session.error = null;
  }
  res.render("register", { user: req.session.user });
});

router.get("/profile", isLogin, async (req, res) => {
  if (req.session.error) {
    res.locals.error = req.session.error;
    req.session.error = null;
  }
  res.render("profile", { user: req.session.user });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Routes pour les utilisateurs
router.get("/users", User.getAllUsers);
router.get("/users/:id", User.getOneUser);
router.post("/users", User.createUser);
router.put("/users/:id", User.updateUser);
router.delete("/users/:id", User.deleteUser);
router.post("/users/login", User.login);

// Routes pour les produits
router.get("/products", isAdmin, Product.getAllProducts);
router.get("/products/:id", Product.getOneProduct);
router.post("/products", isAdmin, Product.createProduct);
router.put("/products/:id", isAdmin, Product.updateProduct);
router.delete("/products/:id", isAdmin, Product.deleteProduct);

module.exports = router;