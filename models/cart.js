const mongoose = require('mongoose');
const db = require('../src/db').getDb();
const Schema = mongoose.Schema;

// create product schema and model
const cartSchema = new Schema({
  items:{
    items:[{qty: Number, default:0,
    required: true,
    productDetails:productsSchema}],
    default:[]
  },
});



// entire cart is purchased and moved to order history
// also a cart should get created automatically when a new user is created
const cart = mongoose.model('cart', cartSchema); // create a product model, which would represent a collection in the database

module.exports = cart;