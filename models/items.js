module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    itemName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageLink: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    for_swap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    for_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }
  , {
    // We're saying that we want our Author to have Posts
    classMethods: {
      associate(models) {
        // An Author (foreignKey) is required or a Post can't be made
        Item.belongsTo(models.User, {
          foreignKey: {
            allowNull: false,
          },
        });
        // Item.belongsTo(models.SwapItems, {
        //   foreignKey: {
        //     allowNull: true,
        //   },
        // });
      },
    },
  });
  return Item;
};
