const express = require('express');
const auth = require('./auth');
const products = require('./products');
const cart = require('./cart');
const utils = require('../src/utils')

const router = express.Router();

router.use('/auth', auth);
router.use('/products', products);
router.use('/cart', cart);


router.get('/', (req, res) => {
  return utils.render(req, res, 'index', 'Home', {});
});

module.exports = router;
