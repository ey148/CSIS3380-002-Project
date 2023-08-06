const router = require('express').Router();
const Rating = require('../models/productRatingList.model');

router.route('/').get((req, res) => {
    Rating.find()
        .then((rating) => res.json(rating))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    const productId = req.body.productId;
    const productRating = req.body.rating;


    // create a new Product object
    const newProductRating = await new Rating({
        productId,
        productRating
    });

    console.log(newProductRating);

    newProductRating
        .save()
        .then(() => {
            res.json(newProductRating)
            console.log('newProductRating added')
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;

/*
//getting specific item for edit
router.route('/:id').get(async (req, res) => {
    await Rating.findById(req.params.id)
        .then((item) => {
            res.json(item);
            console.log('show rating of selected item: ' + req.params.rating);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(async (req, res) => {
    console.log(req.params.id);
    await  Rating.findById(req.params.id)
        .then((itemForEdit) => {
            itemForEdit.stock = req.body.stock;

            itemForEdit
                .save()
                .then(() => res.json('product quantity updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});*/