'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {username:'guru', password:'0183518bfd1cb7b0d7d4cbd6224692de87a7c2b3fba99b7f39d9fdafacffa140', role:'teacher', salt:'1ciJTDN8', createdAt: new Date(), updatedAt: new Date()},
      {username:'akademik', password:'ae100c861e89ebc8ce88312d64c6ee68d8c1ab07e7bc7cac7c2231ae1abf74ef', role:'academic', salt:'yXNL1Neh', createdAt: new Date(), updatedAt: new Date()},
      {username:'kepsek', password:'a853a9904508270bc076d02a12737b401caf9aee766e23e05ff3c808e66510b7', role:'headmaster', salt:'7GJXHOOF', createdAt: new Date(), updatedAt: new Date()}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
