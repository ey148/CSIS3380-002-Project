const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const RatingSchema = new Schema({
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    userId: { type: Number, require: true }
});

// create CartListModel
const productRatingListModel = mongoose.model("productRating", RatingSchema);

module.exports = productRatingListModel;