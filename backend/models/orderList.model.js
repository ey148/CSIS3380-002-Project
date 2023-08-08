const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productTitle: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    priceSubTotal: { type: Number, required: true }
});

const orderListSchema = new Schema({
    items: [cartItemSchema], 
    totalItems: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    userId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// create CartListModel
const orderListModel = mongoose.model("order", orderListSchema);

module.exports = orderListModel;