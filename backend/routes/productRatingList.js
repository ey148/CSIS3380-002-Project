const router = require('express').Router();
const Rating = require('../models/productRatingList.model');

router.route('/').get((req, res) => {
  Rating.find()
    .then((rating) => res.json(rating))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const productId = req.body.productId;
  const rating = req.body.rating;
  const countRating = 1; // Initialize countRating to 1 when a new rating is added

  const newProductRating = new Rating({
    productId,
    rating,
    countRating,
  });

  console.log(newProductRating);

  newProductRating
    .save()
    .then(() => {
      res.json(newProductRating);
      console.log('newProductRating added');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});



module.exports = router;
