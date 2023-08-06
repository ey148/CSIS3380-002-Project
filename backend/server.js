const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    // useCreateIndex: true,  
    useUnifiedTopology: true
}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})

// import routes (can add more)
const cartRouter = require('./routes/cartList'); //link to routes folder
const orderRouter = require('./routes/orderList');
const productsRouter = require('./routes/productList');
const ratingRouter = require('./routes/productRatingList');

//the API path to be called
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/product', productsRouter);
app.use('/rating', ratingRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
