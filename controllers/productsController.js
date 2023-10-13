const ProductModel = require("../models/productsModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("boardProducts", { products: products, user: req.session.user });
    console.log("[GET] -> get all products -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get all products -> error -> \n", error.message)
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.render("product", { product: product, user: req.session.user });
    console.log("[GET] -> get one product -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get one product -> error -> \n", error.message)
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    const savedProduct = await product.save();
    // redirect to the new product
    res.redirect(`/products/${savedProduct._id}`);
    console.log("[POST] -> create one product -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[POST] -> create one product -> error -> \n", error.message)
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
    console.log("[PUT] -> update one product -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[PUT] -> update one product -> error -> \n", error.message)
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
    console.log("[DELETE] -> delete one product -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[DELETE] -> delete one product -> error -> \n", error.message)
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};