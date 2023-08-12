const router = require('express').Router();
let Order = require('../models/orderList.model');

//included get orders by userId
router.route('/').get((req, res) => {
    const userId = req.query.userId;

    if (userId){
        Order.find({ userId: userId })
            .then((items) => {
                res.json(items);
                console.log(`Show selected item of user${userId}: ` + items);
            })
            .catch((err) => res.status(400).json('Error: ' + err));
    }else{
        Order.find()
            .then((order) => res.json(order))
            .catch((err) => res.status(400).json('Error: ' + err));
    }
    
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

module.exports = router;