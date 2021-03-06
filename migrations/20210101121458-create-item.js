'use strict';

var tableName = 'Items';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      discount: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      length: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      weight: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      stock: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'Categories', // name of parent table
          key: 'id', // key in parent table that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'Vendors', // name of parent table
          key: 'id', // key in parent table that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(tableName);
  },
};
