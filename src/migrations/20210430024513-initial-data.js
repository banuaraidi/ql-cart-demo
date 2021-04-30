'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('products', [
        {
          // id: Sequelize.fn('uuid'),
          sku: 'IP12PM9',
          name: 'Iphone 12 Pro Max',
          price: 999,
          quantity: 10,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          // id: Sequelize.fn('uuid'),
          sku: 'AMBP20',
          name: 'Macbook Pro',
          price: 2999,
          quantity: 5,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          // id: Sequelize.fn('uuid'),
          sku: 'APP20E',
          name: 'AirPods Pro',
          price: 249,
          quantity: 50,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          // id: Sequelize.fn('uuid'),
          sku: 'CIP20CP',
          name: '20W Apple USB-C Power Adapter',
          price: 19,
          quantity: 100,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          // id: Sequelize.fn('uuid'),
          sku: 'AHPM2',
          name: 'HomePod mini',
          price: 99,
          quantity: 100,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        }
      ], {});
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
