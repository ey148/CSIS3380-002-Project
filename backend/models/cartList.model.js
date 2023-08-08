const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const cartListSchema = new Schema({
    productId: {type: String, required: true},
    productTitle: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    priceSubTotal: {type: Number, required: true},
    userId: {type: Number, required: true}
});

// create CartListModel
const cartListModel = mongoose.model("cartItems", cartListSchema);

module.exports = cartListModel;