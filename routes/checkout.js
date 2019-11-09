const express = require('express');

const utils = require('../src/utils')
const Products = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then((output) => {
    return utils.render(req, res, 'checkout', 'checkout', {cart: output.cart});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, 'Failed to connect to database');
  });
});

module.exports = router;