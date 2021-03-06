const express = require('express');
const mongoose = require('mongoose');

const utils = require('../src/utils');
const Product = require('../models/product');
const router = express.Router();

/**
 * Get the main shop page
 * Optional parameters include:
 *  gender - the gender of the shoe, ENUM either m or f
 *  brand - the brand of the shoe, string
 *  category - a category the shoe is part of, string
 *  subCategory - a sub category for the shoe, string
 *  maxPrice - the max price that we want to search for, integer >= 0
 * 
 * 
 * Pagination: perPage variable contains max number of items on each page, page variable contains current page number.
 * First we are finding all documents in Products collection: 
 * For each page we need to skip ((perPage * page) - perPage) values (on the first page the value of the skip should be 0):
 * output only perPage items (4 in this case):
 * count all items in collection with count() (we will use this value to calculate the number of pages):
 */
router.get('/', (req, res) => {
  let maxPrice = 9999; // assumes that we wont have a product more than this cost (highly unlikely anyway)
  let minPrice = 0;

  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  delete req.query.pagination
  delete req.query.page

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

  if (req.query.minPrice) { // is max price set?
    if (Number.isNaN(Number.parseInt(req.query.minPrice))) { // not a number
      return utils.renderError(req, res, 400, 'minPrice must be a number');
    } else {
      if(Number.parseInt(req.query.minPrice) < 0) { // invalid min price
        return utils.renderError(req, res, 400, 'minPrice must be a number');
      }
      minPrice = Number.parseInt(req.query.minPrice);
      delete req.query.minPrice;
    }
  }

  // `req.query` is passed directly to mongoose in order to find the documents
  Product.find(req.query).skip((page - 1) * pagination).limit(pagination).where('cost').lte(maxPrice).where('cost').gte(minPrice).then((output) => {
    Product.countDocuments(req.query).where('cost').lte(maxPrice).where('cost').gte(minPrice).exec(function(err, count){
      if(err){
        utils.log('error', err);
        return utils.renderError(req, res, 500, 'Failed to load products');
      }
      return utils.render(req, res, 'products', 'All Products', {products: output, current:page, pages:Math.ceil(count/pagination)});
    })
  }).catch((error) => {
    utils.log('error', error)
    return utils.renderError(req, res, 500, "Failed to connect to database");
  })
});

router.get('/search/', (req, res) => {
  if(!req.query.q) return utils.renderError(req, res, 400, 'No search parameter supplied');
  Product.find({$text: {$search: `"${req.query.q.trim()}"`}}).then((output) => {
    return utils.render(req, res, 'products', 'Search Results', {products: output});
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, 'Search failed.');
  })
});

router.get('/:id', (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) { // valid id
    Product.findById(req.params.id).then((output) => {
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
});

module.exports = router;
