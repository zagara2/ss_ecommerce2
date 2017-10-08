exports.signup = (req, res) => {
  res.render('signup');
};

exports.login = (req, res) => {
  res.render('login');
};

exports.dashboard = (req, res) => {
  res.render('dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
