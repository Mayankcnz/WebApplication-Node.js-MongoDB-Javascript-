/**
 * Render a page
 * @param {Request} req 
 * @param {Response} res 
 * @param {string} page 
 * @param {string} title 
 * @param {Object} data 
 */
const render = (req, res, page, title, data) => {
  res.render('layout', {page, title, data, user: req.user});
};

const renderError = (req, res, code, error) => {
  render(req, res, 'error', `Error ${code}`, {error, code});
}

module.exports = {
  render,
  renderError,
  
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.redirect('/auth/steam');
    }
  },
};
