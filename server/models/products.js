'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};
