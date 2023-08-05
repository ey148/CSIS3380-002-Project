const router = require('express').Router();
let Product = require('../models/productList.model');

router.route('/').get((req, res) => {
    Product.find()
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const category = req.body.category;
    const brand = req.body.brand;
    const model = req.body.model;
    const price = req.body.price;
    const stock = req.body.stock;
    const description = req.body.description;
    const img_src = req.body.img_src;

    // create a new Product object
    const newProduct = await new Product({
        productId,
        title,
        category,
        brand,
        model,
        price,
        stock,
        description,
        img_src
    });

    console.log(newProduct);
    
    newProduct
        .save()
        .then(() => {
            res.json(newProduct)
            console.log('newProduct added')
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

//getting specific item for edit
router.route('/:id').get(async (req, res) => {
    await Product.findById(req.params.id)
        .then((item) => {
            res.json(item);
            console.log('show selected item: ' + req.params.id);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(async (req, res) => {
    console.log(req.params.id);
    await  Product.findById(req.params.id)
        .then((itemForEdit) => {
            itemForEdit.stock = req.body.stock;

            itemForEdit
                .save()
                .then(() => res.json('product quantity updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;