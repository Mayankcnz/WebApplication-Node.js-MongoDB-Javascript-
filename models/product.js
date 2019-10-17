const mongoose = require('../src/db').getDb();
const Schema = mongoose.Schema;

// create product schema and model
const productSchema = new Schema({
  name: {
    type:String,
    required:[true, 'Name field is required']
  },
  category: {
    type:String,
    required:[true, 'Name field is required']
  },
  subcategory: [{
    type:String,
  }],
  stock: [{
    type: Array,
  }],
  description: {
    type:String,
    required:[true, 'Description field is required']
  },
  avilable: {
    type: Boolean,
    default: true
  },
  description:String,
  created_at: { type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});

const product = mongoose.model('product', productSchema); // create a product model , which would represent a collection in the database

module.exports = product;