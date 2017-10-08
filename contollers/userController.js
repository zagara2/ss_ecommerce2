const path = require('path');
const db = require('../models');

exports.items = (req, res) => {
  console.log(`user-id: ${req.session.passport.user}`);

  db.Item.findAll({
    where: {
      UserId: req.session.passport.user,
    }
  }).then((dbItems) => {
    var hbsObject = {
      items: dbItems
    }
    res.render('user-items', hbsObject);
  });
};

exports.transactions = (req, res) => {
  db.SwapTransaction.findAll({
    where: {
      $or: [{
          user1: req.session.passport.user,
        },
        {
          user2: req.session.passport.user,
        },
      ],
    },
  }).then((transactions) => {

    hbsObject = {
      transaction: transactions,
    };
    res.render('transaction', hbsObject);
  });
};

//   });
//   db.User.findOne({
//         where: {
//           id: req.session.passport.user
//         }
//       }).then(function(user) {
//         console.log(user);
//       });
//     res.render('user-items');
// };

// exports.login = (req, res) => {
//   res.render('login');
// };

// exports.dashboard = (req, res) => {
//   res.render('dashboard');
// };

// exports.logout = (req, res) => {
//   req.session.destroy((err) => {
//     res.redirect('/');
//   });
// };