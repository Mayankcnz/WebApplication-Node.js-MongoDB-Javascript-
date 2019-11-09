const express = require('express');
const NodeCache = require('node-cache');

const auth = require('./auth');
const products = require('./products');
const cart = require('./cart');
const checkout = require('./checkout');
const utils = require('../src/utils');

const Products = require('../models/product');

const router = express.Router();
const cache = new NodeCache({stdTTL: 60 * 60}); //cache of 1 hour

router.use('/auth', auth);
router.use('/products', products);
router.use('/cart', cart);
router.use('/checkout',checkout);

router.get('/', (req, res) => {
  getCachedItems().then((output) => {
    const updatedProducts = output[0]
    const newProducts = output[1]
    return utils.render(req, res, 'index', 'Home', {newProducts, updatedProducts});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, "Failed to connect to database")
  });
});

router.get('/about', (req, res) => {
  return utils.render(req, res, 'about', 'About');
});

getCachedItems = () => new Promise((resolve, reject) => {
  const newProducts = cache.get('new');
  const updatedProducts = cache.get('updated');

  if(newProducts && updatedProducts) { // both items exist in cache
    resolve([updatedProducts, newProducts]);
  } else {
    Promise.all([
      Products.find().sort({updated_at: -1}).limit(4),
      Products.find().sort({created_at: -1}).limit(4),
    ]).then((outputs) => {
      utils.log('info', 'Recaching home page');
      cache.set('updated', outputs[0]);
      cache.set('new', outputs[1]);
      resolve(outputs);
    }).catch((error) => {
      reject(error);
    });
  }
});

module.exports = router;
