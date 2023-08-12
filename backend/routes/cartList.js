const router = require('express').Router();
let Cart = require('../models/cartList.model');

//Get cart by userId (using query)
router.route('/').get(async (req, res) => {
    const userId = req.query.userId; // Get the userId from the query parameter

    // Use the userId to fetch the cart items for that user
    try {
        const cartItems = await Cart.find({ userId: userId });
        res.json(cartItems);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/add').post(async (req, res) => {

    const productId = req.body.productId;
    const productTitle = req.body.productTitle;
    const quantity = parseInt(req.body.quantity);
    const price = parseFloat(req.body.price);
    const priceSubTotal = parseFloat(req.body.priceSubTotal);   
    const userId = parseInt(req.body.userId);

    // create a new Activity object
    const newCartItem = await new Cart({
        productId,
        productTitle,
        quantity,
        price,
        priceSubTotal,
        userId
    });

    console.log(newCartItem);
    
    newCartItem
        .save()
        .then(() => {
            res.json('CartItem added!')
            console.log('New Item added')
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

//getting specific item for edit
router.route('/:id').get(async (req, res) => {
    
    await Cart.findById(req.params.id)
        .then((item) => {
            res.json(item);
            console.log('show selected item: ' + req.params.id);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(async (req, res) => {
    console.log(req.params.id);
    await  Cart.findById(req.params.id)
        .then((itemForEdit) => {
            itemForEdit.quantity= req.body.quantity;
            itemForEdit.priceSubTotal= req.body.priceSubTotal;

            itemForEdit
                .save()
                .then(() => res.json('cartItem quantity and subTotal updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});


//delete specific item
router.route('/delete/:id').delete(async (req, res) => {
    
    await Cart.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('cartItem deleted.');
            console.log('delete logged');
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

//clear Cart by userId after order confirmed
router.route('/clear/:userId').delete((req, res) => {
    const userId = req.params.userId;
    Cart.deleteMany({userId: userId})
        .then(() => res.json(`CartItems for user${userId} deleted!`))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
