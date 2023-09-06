'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoices.init({
    userId: DataTypes.INTEGER,
    sdt: DataTypes.STRING,
    address: DataTypes.STRING,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};