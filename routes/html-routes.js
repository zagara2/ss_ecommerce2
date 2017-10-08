const userController = require('./../contollers/userController');
const db = require('./../models');


// these are some initial html routes that we had talked about on Monday
module.exports = function(app) {
  app.get('/', (req, res) => {
    db.Item.findAll({
      include: [{
        model: db.User,
      }],
      limit: 10,
    }).then((rows) => {
      const loggedIn = (req.session.passport) ? true : false;
      if (loggedIn) {
        db.User.findById(req.session.passport.user).then((row) => {
          if (row) {
            hbrObject = {
              loggedIn: loggedIn,
              user: row.email,
              rows,
            };
          };
        });
      } else hbrObject = { rows };
      res.render('index.hbs', hbrObject);
    });
  });
  // (req, res) => {
  //   res.render('index.hbs');
  // });
  app.get('/signup', (req, res) => {
    res.render('signup.hbs');
  });
  // app.get('/login', (req, res) => {
  //   res.render('login.hbs');
  // });
  app.get('/user', isLoggedIn, userController.items);
  app.get('/user/items', isLoggedIn, (req, res) => {
    res.redirect('/user');
  });
  app.get('/user/items/create', isLoggedIn, (req, res) => {
    res.render('createItems.hbs');
  });
  app.get('/pending', isLoggedIn, (req, res) => {
    res.render('pending.hbs');
  });
  app.get('/user/transactions', isLoggedIn, userController.transactions);
};

function isLoggedIn(req, res, next) {
  req.session.returnTo = req.path;
  if (req.isAuthenticated()) return next();
  return res.redirect('/login');
}