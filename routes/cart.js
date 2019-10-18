const express = require('express');

const utils = require('../src/utils')

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

router.get('/add/:id', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

router.get('delete/:id', utils.ensureAuthenticated, (req, res) => {
  return res.send('CART');
});

module.exports = router;