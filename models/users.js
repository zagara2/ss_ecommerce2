module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(15),
      allowNull: true,
      // unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      is: ['^[a-z]+$', 'i'],
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      is: ['^[a-z]+$', 'i'],
    },
    streetAddress: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Item, {
          onDelete: 'cascade',
        });
        User.hasMany(models.SwapTransaction, {
          onDelete: 'cascade',
        });
      },
    },
  });
  return User;
};