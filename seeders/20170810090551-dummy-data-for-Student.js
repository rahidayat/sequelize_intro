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
    return queryInterface.bulkInsert('Students', [
      {first_name:'Andi', last_name:'Malarangeng', email:'andimal@sekolah.id', createdAt: new Date(), updatedAt: new Date()},
      {first_name:'Briptu', last_name:'Norman', email:'briptunorman@sekolah.id', createdAt: new Date(), updatedAt: new Date()},
      {first_name:'Cak', last_name:'Lontong', email:'caklontong@sekolah.id', createdAt: new Date(), updatedAt: new Date()},
      {first_name:'Desy', last_name:'Ratnasari', email:'desy@sekolah.id', createdAt: new Date(), updatedAt: new Date()},
      {first_name:'Eko', last_name:'Patrio', email:'ekopat@sekolah.id', createdAt: new Date(), updatedAt: new Date()}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Students', null, {});
  }
};
