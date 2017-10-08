const db = require('../models/');

module.exports = (app) => {
  // gets all items for a given user
  app.get('/:userId/items', (req, res) => {
    db.Item.findAll({
      where: {
        UserId: req.params.userId
      },
    }).then((dbItems) => {
      const hbsObject = {
        items: dbItems,
      };
      console.log(dbItems);
      res.render('user-items', hbsObject);
    });
  });


  // gets a single user item
  app.get('/:userId/items/:item', (req, res) => {
    db.Item.findOne({
      where: {
        id: req.params.item,
      },
    }).then((dbItem) => {
      console.log(dbItem);
      res.render('item', dbItem);
    });
  });

  // Creates a new transaction request
  app.post('/trade', isLoggedIn, (req, res) => {
    db.Item.findOne({
      where: {
        id: req.body.requesterItem,
        userId: req.session.passport.user,
        active: true,
      },
    }).then((requesterItem) => {
      if (!requesterItem) return res.json('your item unavailable');
      db.Item.findOne({
        where: {
          id: req.body.requesteeItem,
          userId: req.body.requesteeId,
          for_swap: true,
          active: true,
        },
      }).then((requesteeItem) => {
        if (!requesteeItem) return res.json('their item unavailable');
        db.SwapTransaction.findOne({
          where: {
            user1: req.session.passport.user,
            swapItem1: req.body.requesterItem,
            user2: req.body.requesteeId,
            swapItem2: req.body.requesteeItem,
          },
        }).then((transaction) => {
          if (!transaction) {
            db.SwapTransaction.create({
              user1: req.session.passport.user,
              swapItem1: req.body.requesterItem,
              user2: req.body.requesteeId,
              swapItem2: req.body.requesteeItem,
              status: 'Pending',
            }).then((createdTransaction) => {
              return res.json({
                result: 'created',
                createdTransaction,
              });
            });
          } else {
            return res.json({
              result: 'exists',
              transaction,
            });
          }
        });
      });
    });
  });

  // creates a new item for the logged in user
  app.post('/item/create', isLoggedIn, (req, res) => {
    db.Item.create({
      itemName: req.body.itemName,
      description: req.body.description,
      imageLink: req.body.imageLink,
      active: req.body.active,
      for_swap: req.body.for_swap,
      for_sale: req.body.for_sale,
      value: req.body.value,
      public: req.body.public,
      UserId: req.session.passport.user,
    }).then((dbItem) => {
      res.redirect('/user/');
    });
  });

  // app.get('/:userId/trade-items', isLoggedIn, (req, res) => {
  //   db.Item.findAll({
  //     where: {
  //       UserId: {
  //         $ne: req.params.userId
  //       },
  //     },
  //   }).then((tradeItems) => {
  //     db.Item.findAll({
  //       where: {
  //         UserId: req.params.userId
  //       },
  //     }).then((userItems) => {
  //       var hbsObject = {
  //         tradeItems: tradeItems,
  //         userItems: userItems,
  //       }
  //       res.render('items', hbsObject);
  //     });
  //   });
  // });

  // updates an item for a logged in user
  app.put('/item/update', isLoggedIn, (req, res) => {
    db.Item.update(
      req.body, {
        where: {
          $and: [{
              id: req.body.itemId,
            },
            {
              userId: req.session.passport.user,
            },
          ],
        },
      }).then((dbItem) => {
      res.redirect('/user-item');
    });
  });

  // deletes an item for a logged in user
  app.put('/item/delete', isLoggedIn, (req, res) => {
    db.Item.destroy(
      req.body, {
        where: {
          $and: [{
              id: req.body.itemId,
            },
            {
              userId: req.session.passport.user,
            },
          ],
        }
      }).then((dbItem) => {
      res.redirect('/user-item');
    });
  });

  // app.put('/trade', isLoggedIn, (req, res) => {
  //   // console.log(req.body);
  //   // would need trade confirmation here
  //   db.Item.findOne({
  //     where: {
  //       id: req.body.TradeItemId
  //     }
  //   }).then((tradeItem) => {

  //     var tradeeId = tradeItem.UserId;
  //     console.log(req.body.UserId, req.body.UserItemId)
  //     db.Item.update({
  //       UserId: req.body.UserId
  //     }, {
  //       where: {
  //         id: req.body.TradeItemId
  //       }
  //     }).then(() => {
  //       db.Item.update({
  //         UserId: tradeeId
  //       }, {
  //         where: {
  //           id: req.body.UserItemId
  //         }
  //       });
  //     });
  //   });
  // });
};
exports.displayAll = (req, res) => {
  db.Item.findAll({
    limit: 10,
  }).then((rows) => {
    res.render('index.hbs', rows);
  });
};


function isLoggedIn(req, res, next) {
  req.session.returnTo = req.path;
  if (req.isAuthenticated())
    return next();

  res.redirect('/login');
}
