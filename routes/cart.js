const express = require('express');

const utils = require('../src/utils')
const Products = require('../models/product')
const User = require('../models/user')

const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

router.get('/checkout/', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

router.get('/complete/', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

/**
 * Clear the users cart
 */
router.get('/clear/', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

router.post('/add/:id', utils.ensureAuthenticated, (req, res) => {

  const {user} = req;
  Products.findById(req.params.id).then((product) => {

    if(!product) { // not found
      return utils.renderError(req, res, 404, 'Product not found');
    }
     User.findById(`${user._id}`).then((User) =>{
     var length = User.cart.items.push(product)
     User.save();
  }).catch((error) =>{
      utils.log('error', error)
      return utils.renderError(req, res, 500, "Failed to connect to database");
    });
}).catch((error ) =>{
    utils.log('error', error)
    return utils.renderError(req, res, 500, "Failed to connect to database");
});

});

router.get('delete/:id', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

module.exports = router;