'use strict';

module.exports = {
  up: (queryInterface) => {
    var tableName = 'OrderStatuses';
    return queryInterface.bulkInsert(tableName, [
      {
        name: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delivered',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cancelled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(tableName, null, {});
  },
};
