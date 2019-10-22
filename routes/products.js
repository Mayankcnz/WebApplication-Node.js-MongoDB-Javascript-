const express = require('express');
const mongoose = require('mongoose');

const utils = require('../src/utils');
const Products = require('../models/product');
const router = express.Router();

/**
 * Get the main shop page
 * Optional parameters include:
 *  gender - the gender of the shoe, ENUM either m or f
 *  brand - the brand of the shoe, string
 *  category - a category the shoe is part of, string
 *  subCategory - a sub category for the shoe, string
 *  maxPrice - the max price that we want to search for, integer >= 0
 */
router.get('/', (req, res) => {
  let maxPrice = 9999; // assumes that we wont have a product more than this cost

  if (req.query.gender) { // does gender param exist
    if (!req.query.gender.toLowerCase() === 'f' || !req.query.gender.toLowerCase() === 'm') { // not m or f
      req.query.gender = req.query.gender.toLowerCase();
      return utils.renderError(req, res, 400, 'Gender must be either \'m\' or \'f\'');
    }
  }

  if (req.query.maxPrice) { // is max price set?
    if (Number.isNaN(Number.parseInt(req.query.maxPrice))) { // not a number
      return utils.renderError(req, res, 400, 'maxPrice must be a number');
    } else {
      if(Number.parseInt(req.query.maxPrice) < 0) { // invalid max price
        return utils.renderError(req, res, 400, 'maxPrice must be a number');
      }
      maxPrice = Number.parseInt(req.query.maxPrice);
      delete req.query.maxPrice;
    }
  }

  Products.find(req.query).where('cost').lte(maxPrice).then((output) => {
    return utils.render(req, res, 'products', 'All Products', {products: output});
  }).catch((error) => {
    return utils.renderError(req, res, 500, "Failed to connect to database");
  })
});

router.get('/:id', (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) { // valid id
    Products.findById(req.params.id).then((output) => {
      if(!output) { // not found
        return utils.renderError(req, res, 404, 'Product not found');
      }
      return utils.render(req, res, 'product', `${output.name}`, {product: output});
    }).catch((error) => {
      utils.log('error', error)
      return utils.renderError(req, res, 500, "Failed to connect to database");
    });
  } else {
    return utils.renderError(req, res, 400, 'Invalid id');
  }
})

module.exports = router;
