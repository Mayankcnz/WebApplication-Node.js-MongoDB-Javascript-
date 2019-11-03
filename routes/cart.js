const express = require('express');

const utils = require('../src/utils')
const Products = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {

  console.log("IMMMMMMMMMMMM");
  
  const {user} = req;
  console.log("hero");
  console.log(user);
  if(user.cart){
    //return res.render('partials/navigation', {products:null})
  }

  let cart = new Cart(user.cart);
  console.log(cart);
 //// return utils.render(req, res, 'cart', 'Home', {products: cart.generateArray, totalPrice: cart.totalPrice});
  //res.render('partials/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
  
  
  //return res.send('CART');
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
  const productID = req.params.id


  console.log(user)
  console.log("AAAAAAAAAAAAAAAAAAAAAAAA");

 // console.log("===================================")
  var cart = new Cart(user.cart ? user.cart : {});

  // find the product by ID
  Products.findById(productID).then((product) => {

  
    if(!product) { // not found
      return utils.renderError(req, res, 404, 'Product not found');
    }
    console.log(product);
    cart.add(product, product.id);
    user.cart = cart;
    console.log(user);
    res.redirect('/');
    
     //User.deleteOne({_id: user._id}).then((output) =>{
       //console.log("deletetion");
       //console.log(output);
     //})

/** 
     User.findById(`${user._id}`).then((User) =>{
      console.log("IDU");
      console.log(User);

      console.log(product);

      User.cart.items.items.push({ productID: product.id , qty:1, info:{prod : product}})
      User.save();

      console.log(User.cart.items.items);**/

    // var length = User.cart.items.push(product)
    // User.save();
  //}).catch((error) =>{
    //  utils.log('error', error)
     // return utils.renderError(req, res, 500, "Failed to connect to database");
    //});


}).catch((error ) =>{
    utils.log('error', error)
    return utils.renderError(req, res, 500, "Failed to connect to database");
}); 

});


router.get('delete/:id', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

module.exports = router;