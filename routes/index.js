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
  Promise.all([
    Products.find().sort({updated_at: -1}).limit(4),
    Products.find().sort({created_at: -1}).limit(4),
  ]).then((output) => {
    const updatedProducts = output[0]
    const newProducts = output[1]
    return utils.render(req, res, 'index', 'Home', {newProducts, updatedProducts});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, "Failed to connect to database")
  });
});

router.get('/about', (req, res) => {
  return utils.render(req, res, 'about', 'About');
});

module.exports = router;
