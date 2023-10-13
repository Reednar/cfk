const ProductModel = require("../models/productsModel");
const multer = require("multer");

const getAllProducts = async (req, res) => {
  try {
    var products = await ProductModel.find();
    products = JSON.parse(JSON.stringify(products));

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
    res.render("detailsProducts", { product: product, user: req.session.user });
    console.log("[GET] -> get one product -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get one product -> error -> \n", error.message)
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, Desc, price } = req.body;

    // Configuration du middleware multer pour gérer le téléversement
    const storage = multer.diskStorage({
      destination: './public/upload', // Dossier de destination pour les images téléversées
      filename: (req, file, cb) => {
        cb(null, 'product_' + Date.now() + '_' + file.originalname);
      },
    });

    const upload = multer({ storage }).single('img'); // 'img' doit correspondre à l'attribut "name" de votre champ de fichier dans le formulaire HTML

    upload(req, res, async (err) => {
      if (err) {
        req.session.error = "Erreur lors du téléversement de l'image";
        res.redirect("/createProduct");
        return;
      }

      // Vous pouvez maintenant utiliser req.file pour accéder au fichier téléversé
      if (req.file) {
        const imagePath = req.file.filename; // Le nom du fichier généré par multer
        const product = new ProductModel({ name, Desc, image: imagePath, price });
        await product.save()
          .then(() => {
            req.session.success = "Produit créé avec succès"; // Optionnel : message de succès
            res.redirect("/products");
          })
          .catch((error) => {
            req.session.error = "Erreur lors de la création du produit : " + error.message;
            res.redirect("/createProduct");
          });
      } else {
        req.session.error = "Veuillez sélectionner une image valide";
        res.redirect("/createProduct");
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[POST] -> create one product -> error -> \n", error.message);
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