const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const userListSchema = new Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    gender: { type: String, required: true }
});

// create UserListModel
const userListModel = mongoose.model("user", userListSchema);

module.exports = userListModel;