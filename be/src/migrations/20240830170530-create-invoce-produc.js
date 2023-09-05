'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IvoPro', {
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        primaryKey: true,
      },
      invoiceId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Invoices',
          key: 'id'
        },
        primaryKey: true,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('IvoPro');
  }
};