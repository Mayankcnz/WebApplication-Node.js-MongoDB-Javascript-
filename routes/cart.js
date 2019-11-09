const express = require('express');

const utils = require('../src/utils')
const Products = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart');
const Order = require('../models/order');


const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then((output) => {
    return utils.render(req, res, 'cart', 'Cart', {cart: output.cart});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, 'Failed to connect to database');
  });
});

router.post('/checkout/', utils.ensureAuthenticated, (req, res) => {

  const {formData} = req.body
  var address = {
    address: formData.address, city: formData.city, 
        zip: formData.zip
  }

  var paymentInfo = {
    cardName: formData.nameOnCard, creditNumber: formData.creditCardNumber,
      expMonth: formData.expMonth, expYear: formData.expYear, CVC: formData.CVC
  }

  User.findById(req.user._id).then((user) =>{

    var order = new Order({
      user : user, 
      cart : user.cart,
      address : address,
      paymentInfo: paymentInfo,
      email: formData.email,
      name: formData.name
    })

    order.save((err, output) =>{
      if(err) {
        utils.log('error', err)
        return res.send({complete: false, error: 'Failed to save order'})
      }
      return res.send({complete: true})
      console.log("order saved");
    })
});

});

/**
 * Clear the users cart
 */
router.get('/clear/', utils.ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then((output) => {
    output.cart = {items: [], totalCost: 0};
    output.save();
    return utils.render(req, res, 'cart', 'Cart', {cart: {items: [], totalCost: 0}});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, 'Error occured clearing cart');
  })
});

router.post('/add/:id', utils.ensureAuthenticated, (req, res) => {

  const {size} = req.body
  Promise.all([
    User.findById(req.user._id),
    Products.findById(req.params.id)
  ]).then((outputs) => {
    if(!outputs[1]) { // product not found
      return res.send({error: 'Product not found', status: 404, added: false});
    }

    const cart = new Cart(outputs[0].cart);
    cart.add(outputs[1], size);
    outputs[0].cart = cart.getObject();
    outputs[0].save();
    return res.send({added: true, status: 200})
  }).catch((error) =>{
    utils.log('error', error)
    return res.send({error, status: 500, added: false});
  });
});

router.delete('/delete/:id', utils.ensureAuthenticated, (req, res) => {
  const id = req.params.id
  User.findById(req.user._id).then((user) => {
  const {cart} = user
  const items = cart.items;
  const mycart = new Cart(cart);
  for (i in items){
    if(items[i].new_item._id == id){
      var list = mycart.remove(i);
      break;
    }
  }
  user.cart = mycart.getObject();
  user.save();

 return res.send({delete: true, status: 200})
  }).catch((error) =>{
    utils.log('error', error);
    return res.send({delete: false, status: 500, error: 'Failed to delete item'})
  });
});

module.exports = router;