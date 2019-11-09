const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();

const utils = require('../src/utils');
const User = require('../models/user');

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

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

router.get('/logout/', utils.ensureAuthenticated, (req, res) => {
  req.session.destroy();
  return res.redirect('/')
});

router.get('/forgot/', (req, res) => {
  if(req.query.token) {
    User.findOne({token: req.query.token}).then((output) => {
      if(!output || output.authType !== 'local') return res.redirect('/auth/login'); // user not found or not password auth
      if (output.token === req.query.token) { // can reset passord
        return utils.render(req, res, 'reset', 'Reset Password', {token: req.query.token});
      }
      return utils.renderError(req, res, 400, 'Invalid reset token');
    }).catch((error) => {
      utils.log('error', error);
      return utils.renderError(req, res, 500, 'Something went wrong');
    });
  } else {
    return utils.render(req, res, 'forgot', 'Forgot Password', {});
  }
});

router.get('/timeout/', (req, res) => {
  if(req.user) {
    req.session.destroy();
    return utils.render(req, res, 'timeout', 'Timed out', {});
  } else {
    return res.redirect(req.query.location || '/');
  }
});

router.post('/sendReset/', (req, res) => {
  const current_date = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  const token = crypto.createHash('sha1').update(current_date + random).digest('hex');
  User.findOne({email: req.body.email}).then((output) => {
    if(!output || output.authType !== 'local') return res.redirect('/auth/forgot/'); // silent fail exit
    output.token = token;
    output.save(); // save the user

    const email = { // build the email
      from: process.env.EMAIL_EMAIL,
      to: req.body.email,
      subject: 'ShoeShop Password Reset',
      text: `Hello, you have requested a password reset. Navigate to \`/auth/forgot?token=${token}\` to reset your password. You can also paste the token \`${token}\` into the token field of /auth/forgot`,
    };

    // send the email
    transporter.sendMail(email).then((output) => {
      utils.log('info', 'Sent email');
      utils.log('info', output);
      if(!output.accepted) { 
        utils.log('error', 'Email send failed');
      }
      return res.redirect('/auth/forgot/'); // valid email
    }).catch((error) => {
      utils.log('error', error);
      return utils.renderError(req, res, 500, 'Email send failed');
    });
  }).catch((error) => {
    utils.log(error);
    return utils.renderError(req, res, 500, 'Something went wrong');
  });
});

router.post('/reset/', (req, res) => {
  if(req.body.newPass1 !== req.body.newPass2) {
    return utils.renderError(req, res, 400, 'Passwords do not match');
  }
  bcrypt.hash(req.body.newPass1, 10, (err, hash) => { // generate new password
    User.findOne({token: req.body.token}).then((output) => {
      if(!output) return res.redirect('/auth/login'); // silent fail exit
      output.token = undefined; // clear token
      output.password = hash; // update the password
      output.save(); // save the user
      return res.redirect('/auth/login');
    }).catch((error) => {
      utils.log(error);
      return utils.renderError(req, res, 500, 'Something went wrong');
    });
  });
});

router.post('/signup/', (req, res) => {
  User.findOne({email: req.body.email}).then((output) => { // does the user already exist
    if(output) {
      return utils.renderError(req, res, 400, 'User already created with that email');
    } else { // user doesnt exit so create
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) utils.renderError(req, res, 500, 'Failed to register user') // an error occured
        User.create({name: req.body.name, email: req.body.email, password: hash}).then((output) => {
          return res.redirect('/auth/login');
        }).catch((error) => {
          utils.log(error);
          return utils.renderError(req, res, 500, 'Something went wrong');
        })
      })
    }
  }).catch((error) => {
    utils.log('error', error);
    return utils.renderError(req, res, 500, 'Something went wrong');
  });
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
