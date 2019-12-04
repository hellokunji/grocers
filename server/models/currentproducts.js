'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurrentProducts = sequelize.define('CurrentProducts', {
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
  }, {});
  CurrentProducts.associate = function (models) {
    // associations can be defined here
  };
  return CurrentProducts;
};
