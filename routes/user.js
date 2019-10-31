const express = require('express');

const utils = require('../src/utils')
const User = require('../models/user')
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {
  User.getById(req.user._id).then((output) => {
    if(!output) return utils.renderError(req, res, 404, 'User account not found');
    return utils.render(req, res, 'user', 'Your Profile', {});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, 'Something went wrong');
  })
});

module.exports = router;