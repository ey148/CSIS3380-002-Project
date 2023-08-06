const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const RatingSchema = new Schema({
    productId: { type: String, required: true },
    productRating: { type: Number, required: true },
});

// create CartListModel
const productRatingListModel = mongoose.model("productRatingListModel", RatingSchema);

module.exports = productRatingListModel;