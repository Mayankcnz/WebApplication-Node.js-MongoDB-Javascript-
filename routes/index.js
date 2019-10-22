const express = require('express');
const auth = require('./auth');
const products = require('./products');
const cart = require('./cart');
const utils = require('../src/utils');

const Products = require('../models/product');

const router = express.Router();

router.use('/auth', auth);
router.use('/products', products);
router.use('/cart', cart);


router.get('/', (req, res) => {
  Products.find().then((output) => {
    const products = output.slice(0, 6); // get 6 products
    return utils.render(req, res, 'index', 'Home', {products});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, "Failed to connect to database")
  });
});

module.exports = router;
