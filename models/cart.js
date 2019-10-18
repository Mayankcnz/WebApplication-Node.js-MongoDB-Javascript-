const mongoose = require('mongoose');
const db = require('../src/db').getDb();
const Schema = mongoose.Schema;

// create product schema and model
const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Need to know who the cart belongs to']
  },
  items: {
    type: Array,
    required: true,
    default: [],
  }
});

const cart = mongoose.model('cart', cart); // create a product model, which would represent a collection in the database

module.exports = cart;