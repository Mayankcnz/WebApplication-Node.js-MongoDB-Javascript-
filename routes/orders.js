const express = require('express');
const order = require('../models/order');
const router = express.Router();
const utils = require('../src/utils')

router.get('/', utils.ensureAuthenticated, (req, res) => {

    order.find().then((output) =>{
        return utils.render(req, res, 'orders', 'order', {orders: output});
    })

  });

  module.exports = router;