'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IvoPro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IvoPro.init({
    productId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'IvoPro',
    tableName: 'IvoPro'
  });
  IvoPro.removeAttribute('id')
  return IvoPro;
};