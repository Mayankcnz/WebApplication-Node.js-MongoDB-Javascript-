const express = require('express');
const auth = require('./auth');
const products = require('./products');
const cart = require('./cart');
const utils = require('../src/utils');

const ProductController = require('../controllers/product');

const router = express.Router();

router.use('/auth', auth);
router.use('/products', products);
router.use('/cart', cart);


router.get('/', (req, res) => {
  ProductController.findAll().then((output) => {
    const products = output.slice(0, 6); // get 6 products
    return utils.render(req, res, 'index', 'Home', {products: [{name: 'name', cost: 100, description: 'description', image: ''}]});
    // return utils.render(req, res, 'index', 'Home', {products});
  }).catch((error) => {
    console.error(error);
    return utils.renderError(req, res, 500, error)
  });
});

module.exports = router;
