const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Le prix est requis"],
    },
    name: {
        type: String,
        required: [true, "Le nom est requis"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
