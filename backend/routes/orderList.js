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

    // create a new Order object
    const newOrder = await new Order({
        items,
        totalItems,
        grandTotal,
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
// router.route('/:id').get(async (req, res) => {
    
//     await Cart.findById(req.params.id)
//         .then((item) => {
//             res.json(item);
//             console.log('show selected item: ' + req.params.id);
//         })
//         .catch((err) => res.status(400).json('Error: ' + err));
// });

module.exports = router;