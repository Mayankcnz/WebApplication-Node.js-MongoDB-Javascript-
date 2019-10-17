const express = require('express');
const passport = require('passport');

const utils = require('../src/utils');

const router = express.Router();

router.get('/login/', (req, res) => {
  return utils.render(req, res, 'login', 'Login', {});
});

router.get('/signup/', (req, res) => {
  return utils.render(req, res, 'signup', 'Sign Up', {});
});

router.get('/logout/', (req, res) => {
  req.session.destroy();
  return res.redirect('/')
});

router.get('/')

router.post('/signup', (req, res) => {
  return res.send(req.body);
});


/**
 * login routes
 */ 
router.post('/login/local', (req, res) => {
  return res.redirect('/');
});

router.get('/login/facebook',
  passport.authenticate('facebook', { scope : ['email'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    return res.redirect('/');
  }
);

module.exports = router;
