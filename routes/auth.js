const authController = require('../contollers/authController');

module.exports = (app, passport) => {

  app.get('/signup', authController.signup);

  app.get('/login', authController.login);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user',
    failureRedirect: '/signup',
  }));

  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);

  app.post('/login', passport.authenticate('local-signin',
    {
      successRedirect: '/user',
      failureRedirect: '/login'
    }
  ));

  function isLoggedIn(req, res, next) {
    req.session.returnTo = req.path;
    if (req.isAuthenticated())
      return next();

    res.redirect('/login');
  }
};