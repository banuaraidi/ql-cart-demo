'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        // type: Sequelize.UUID,
        // primaryKey: true,
        // defaultValue: Sequelize.UUIDV4,
        // allowNull: false,
        // autoIncrement: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sku: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      price: Sequelize.DECIMAL(10, 2),
      quantity: Sequelize.INTEGER,
      createdAt: Sequelize.DATE(6),
      updatedAt: Sequelize.DATE(6),
    }).then(() => queryInterface.addIndex('products', ['name']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
