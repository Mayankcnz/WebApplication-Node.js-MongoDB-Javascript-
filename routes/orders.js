const express = require('express');
const order = require('../models/order');
const router = express.Router();
const utils = require('../src/utils')

router.use((req, res, next) => {
  if(req.user && req.user.email === process.env.ADMIN_EMAIL) {
    next()
  } else {
    return utils.renderError(req, res, 403, 'Not permitted to use this page!');
  }
})

router.get('/', utils.ensureAuthenticated, (req, res) => {

    order.find().then((output) =>{
        return utils.render(req, res, 'orders', 'order', {orders: output});
    })

  });

  module.exports = router;