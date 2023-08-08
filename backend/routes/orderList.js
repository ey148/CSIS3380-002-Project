const router = require('express').Router();
let Order = require('../models/orderList.model');

router.route('/').get((req, res) => {
    Order.find()
        .then((order) => res.json(order))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    const items = req.body.items;
    const totalItems = req.body.totalItems;
    const grandTotal = req.body.grandTotal;
    const userId = req.body.userId;

    // create a new Order object
    const newOrder = await new Order({
        items,
        totalItems,
        grandTotal,
        userId
    });

    console.log(newOrder);
    
    newOrder
        .save()
        .then(() => {
            res.json(newOrder)
            console.log('newOrder added')
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

//get specific order
router.route('/:userId').get(async (req, res) => {
    
    const userId = req.params.userId;

    await Order.findOne({ userId: userId })
        .then((item) => {
            res.json(item);
            console.log('show selected item: ' + item);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;