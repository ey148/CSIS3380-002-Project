const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const productSchema = new Schema({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    img_src: { type: String, required: true },
});


// create Product Table
// const productModel = mongoose.model("productModel", productSchema);
const productModel = mongoose.model("product", productSchema);

module.exports = productModel;