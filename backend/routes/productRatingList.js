const router = require('express').Router();
const Rating = require('../models/productRatingList.model');

router.route('/').get((req, res) => {

  const userId = req.query.userId;
  const productId = req.query.productId;

  if (userId && productId) {
    Rating.find({ userId: userId, productId: productId })
      .then((ratings) => res.json(ratings))
      .catch((err) => res.status(400).json('Error: ' + err));
  } 
  else if (userId) {
    Rating.find({ userId: userId })
      .then((ratings) => res.json(ratings))
      .catch((err) => res.status(400).json('Error: ' + err));  
  }
  else if (productId) {
    Rating.find({ productId: productId })
      .then((ratings) => res.json(ratings))
      .catch((err) => res.status(400).json('Error: ' + err));  
  } 
  else {
    Rating.find()
      .then((ratings) => res.json(ratings))
      .catch((err) => res.status(400).json('Error: ' + err));
  }
});

router.route('/:productId').get((req, res) => {
  const productId = req.params.productId;

  Rating.findOne({productId: productId})
    .then((rating) => res.json(rating))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {

  const productId = req.body.productId;
  const rating = req.body.rating;
  const userId = req.body.userId;
  
  const newProductRating = new Rating({
    productId,
    rating,
    userId,
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
