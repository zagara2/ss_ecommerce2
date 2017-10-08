module.exports = (sequelize, DataTypes) => {
  const SwapTransaction = sequelize.define('SwapTransaction', {
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    swapItem1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    swapItem2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requesteeAck: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      //add other options (fields?): accepted, complete, declined, canceled
    },
  // }, {
  //   classMethods: {
  //     associate(models) {
  //       SwapTransaction.belongsToMany(models.User, {
  //         through: 'transaction_users',
  //         'foreign-key': 'id',
  //         as: 'user'
  //       });
  //       SwapTransaction.hasMany(models.SwapItems, {
  //         foreignKey: {
  //           allowNull: false,
  //         },
  //       });
  //     },
  //   },
  // }
  });
  return SwapTransaction;
};
