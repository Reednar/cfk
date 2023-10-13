const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
    console.log("[GET] -> get all users -> success");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get all users -> error -> \n", error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
    console.log("[GET] -> get one user -> success");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get one user -> error -> \n", error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, firstname, email, password, confirmPassword } = req.body;

    let errorMessage = null; // Variable pour stocker les messages d'erreur

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email }).exec();

    if (existingUser) {
      errorMessage = "L'utilisateur existe déjà";
    } else if (password !== confirmPassword) {
      errorMessage = "Les mots de passe ne correspondent pas";
    }

    if (errorMessage) {
      req.session.error = errorMessage;
      res.redirect("/register");
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new UserModel({ name, firstname, email, hashedPassword });
      await user.save();
      req.session.success = "Votre compte a été créé";
      res.redirect("/login");
      console.log("[POST] -> create one user -> success");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[POST] -> create one user -> error -> \n", error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, firstname } = req.body;

    // Effectuer ici des contrôles de données si nécessaire

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, firstname },
      { new: true }
    );

    req.session.user = updatedUser;
    req.session.success = "Profil mis à jour";
    res.render("profile", { user: req.session.user });
    console.log("[PUT] -> update one user -> success");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[PUT] -> update one user -> error -> \n", error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    delete req.session.user;
    req.session.success = "Votre compte a été supprimé";
    console.log("[DELETE] -> delete one user -> success");
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[DELETE] -> delete one user -> error -> \n", error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ email }).exec();

    if (!existingUser) {
      req.session.error = "L'utilisateur n'existe pas";
      res.redirect("/login");
      return;
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (!isPasswordCorrect) {
      req.session.error = "Le mot de passe est incorrect";
      res.redirect("/login");
      return;
    }

    // Store user in session
    req.session.user = existingUser;
    req.session.success = "Vous êtes connecté";
    res.redirect("/");
    console.log("[POST] -> login -> success");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[POST] -> login -> error -> \n", error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
