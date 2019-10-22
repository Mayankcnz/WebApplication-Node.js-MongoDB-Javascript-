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


  console.log("====================================");
  const {user} = req;
  
  
  Products.findById(req.params.id).then((output) => {

    if(!output) { // not found
      return utils.renderError(req, res, 404, 'Product not found');
    }

    User.find().then((output) =>{
      console.log("OUTPUT");
      console.log(output);
    }).catch((error) =>{
      console.log("error");
    });
  

}).catch((error ) =>{
  console.log(error);
});

});

router.get('delete/:id', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

module.exports = router;