const express = require('express');

const utils = require('../src/utils')
const Products = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {
      return utils.render(req, res, 'checkout', 'checkout', {});
});

module.exports = router;