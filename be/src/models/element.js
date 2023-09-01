'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Element extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Element.belongsTo(models.Products, {
        foreignKey: 'productId'
      })
    }
  }
  Element.init({
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    deleteFlg : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Element',
  });
  return Element;
};