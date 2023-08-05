const router = require('express').Router();
let Cart = require('../models/cartList.model');

router.route('/').get((req, res) => {
    Cart.find()
        .then((cartItems) => res.json(cartItems))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {

    console.log("body:", JSON.stringify(req.body));

    //const productId = req.body.key;
    const productId = req.body.productId;
    const productTitle = req.body.productTitle;
    const quantity = parseInt(req.body.quantity);
    const price = parseFloat(req.body.price);
    const priceSubTotal = parseFloat(req.body.priceSubTotal);   

    // create a new Activity object
    const newCartItem = await new Cart({
        productId,
        productTitle,
        quantity,
        price,
        priceSubTotal
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

//clear Cart when posted and confirmed
router.route('/clear').delete((req, res) => {
    Cart.deleteMany({})
        .then(() => res.json('All CartItems deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
