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

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email }).exec();

    if (existingUser) {
      req.session.error = "User already exists";
      res.redirect("/register");
    } else if (password !== confirmPassword) {
      req.session.error = "Passwords are not the same";
      res.redirect("/register");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({ name, firstname, email, hashedPassword });
    await user.save();
    res.redirect("/login");
    console.log("[POST] -> create one user -> success");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[POST] -> create one user -> error -> \n", error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
    console.log("[PUT] -> update one user -> success");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[PUT] -> update one user -> error -> \n", error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
    console.log("[DELETE] -> delete one user -> success");
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
      req.session.error = "User does not exist";
      return res.redirect("/login");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (!isPasswordCorrect) {
      req.session.error = "Wrong password";
      return res.redirect("/login");
    }

    // Create session
    req.session.user = existingUser;
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
