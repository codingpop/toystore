export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.belongsToMany(models.Product, {
      through: 'product_order',
      as: 'order',
    });
  };

  return Order;
};
