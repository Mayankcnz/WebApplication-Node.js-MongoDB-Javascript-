const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const utils = require('../src/utils');
const User = require('../models/user');

const router = express.Router();

router.get('/login/', (req, res) => {
  if(req.user) {
    return res.redirect('/');
  }
  return utils.render(req, res, 'login', 'Login', {});
});

router.get('/signup/', (req, res) => {
  if(req.user) {
    return res.redirect('/');
  }
  return utils.render(req, res, 'signup', 'Sign Up', {});
});

router.get('/logout/', (req, res) => {
  req.session.destroy();
  return res.redirect('/')
});

router.post('/signup/', (req, res) => {
  User.findOne({email: req.body.email}).then((output) => { // does the user already exist
    if(output) return res.redirect('/auth/login');
  }).catch((error) => {
    return utils.renderError(req, res, 500, 'Something went wrong');
  });
  
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    User.create({name: req.body.name, email: req.body.email, password: hash}).then((output) => {
      return res.redirect('/auth/login');
    }).catch((error) => {
      utils.log(error);
      return utils.renderError(req, res, 500, 'Something went wrong');
    })
  })
});


/**
 * login routes
 */ 
router.post('/login/local', passport.authenticate('local', { failureRedirect: '/auth/login' }),
(req, res) => {
  res.redirect('/products');
});

router.get('/login/facebook', passport.authenticate('facebook', { scope : ['email'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    return res.redirect('/');
  }
);

module.exports = router;
