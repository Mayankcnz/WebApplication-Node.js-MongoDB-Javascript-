const winston = require('winston');

const User = require('../models/user');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    new winston.transports.File({filename: 'logs/combined.log'}),
    new winston.transports.Console({format: winston.format.simple()})
  ]
});

/**
 * Render a page
 * @param {Request} req 
 * @param {Response} res 
 * @param {string} page 
 * @param {string} title 
 * @param {Object} data 
 */
const render = (req, res, page, title, data) => {
  if(req.user) {
    User.findById(req.user._id).then((output) => {
      return res.render('layout', {page, title, data, user: output});
    }).catch((error) => {
      return res.render('error', {title: `Error ${500}`, data: {error: 'Internal Server Error', code: 500}, user: output});
    })
  } else {
    return res.render('layout', {page, title, data, user: undefined});
  }
};

/**
 * Render an error page
 * @param {Request} req 
 * @param {Response} res 
 * @param {Number} code 
 * @param {string} error 
 */
const renderError = (req, res, code, error) => {
  res.status(code)
  return render(req, res, 'error', `Error ${code}`, {error, code});
}

/**
 * Log a message to the logger
 * @param {string} level the level to log
 * @param {any} message message to log
 */
const log = (level, message) => logger.log(level, message);

module.exports = {
  render,
  renderError,
  log,
  
  /**
   * Ensure that the user is authenticated
   * @param {Request} req
   * @param {Response} res
   * @param {void} next
   */
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.redirect('/auth/login');
    }
  },
};
