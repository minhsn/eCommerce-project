'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.Element, {
        as: 'element',
        foreignKey: 'productId'
      })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    averageRating : DataTypes.DECIMAL(2, 1),
    numberRating : DataTypes.INTEGER,
    deleteFlg : DataTypes.BOOLEAN,
    imageUrl : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};