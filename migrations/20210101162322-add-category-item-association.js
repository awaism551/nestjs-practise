'use strict';

var parentTable = 'Categories';
var parentTablePk = 'id';
var childTable = 'Items';
var childTableFk = 'categoryId';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      childTable, // name of child table
      childTableFk, // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: parentTable, // name of parent table
          key: parentTablePk, // key in parent table that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      childTable, // name of child model
      childTableFk, // key we want to remove
    );
  },
};
