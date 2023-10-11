const express = require("express");
const router = express.Router();
const User = require("../controllers/usersController");
const Product = require("../controllers/productsController");
const { isAdmin, isLogin } = require("../utils/middlewares");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  const error = req.session.error;
  req.session.error = null;
  res.render("register", { error });
});

router.get("/profile", isLogin, async (req, res) => {
  res.render("profile", { user: req.session.user });
});

// Routes pour les utilisateurs
router.get("/users", User.getAllUsers);
router.get("/users/:id", User.getOneUser);
router.post("/users", User.createUser);
router.put("/users/:id", User.updateUser);
router.delete("/users/:id", User.deleteUser);
router.post("/users/login", User.login);

// Routes pour les produits
router.get("/products", Product.getAllProducts);
router.get("/products/:id", Product.getOneProduct);
router.post("/products", isAdmin, Product.createProduct);
router.put("/products/:id", isAdmin, Product.updateProduct);
router.delete("/products/:id", isAdmin, Product.deleteProduct);

module.exports = router;
