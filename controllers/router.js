const express = require("express");
const router = express.Router();
const ProductModel = require("../models/productsModel");
const User = require("../controllers/usersController");
const Product = require("../controllers/productsController");
const { isAdmin, isLogin, setErrorLocals, setSuccessLocals } = require("../utils/middlewares");

router.use(setErrorLocals);
router.use(setSuccessLocals);

router.get("/", async (req, res) => {
  var products = await ProductModel.find();
  products = JSON.parse(JSON.stringify(products));
  res.render("index", { products: products, user: req.session.user, title: "Accueil" });
});

router.get("/login", async (req, res) => {
  res.render("login", { user: req.session.user, title: "Connexion" });
});

router.get("/register", async (req, res) => {
  res.render("register", { user: req.session.user, title: "Inscription" });
});

router.get("/profile", isLogin, async (req, res) => {
  res.render("profile", { user: req.session.user, title: "Profil" });
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
router.get("/createProduct", isAdmin, async (req, res) => {
  res.render("createProducts", { user: req.session.user, title: "Créer un produit" });
});

module.exports = router;