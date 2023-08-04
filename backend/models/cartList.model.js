const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const cartListSchema = new Schema({
    // userId: {type: String, required: true},
    productId: {type: String, required: true},
    productTitle: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    priceSubTotal: {type: Number, required: true}
});

// create CartListModel
const cartListModel = mongoose.model("cartListModel", cartListSchema);

module.exports = cartListModel;