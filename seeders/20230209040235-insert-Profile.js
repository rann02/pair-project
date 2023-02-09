'use strict';
const fs = require('fs')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8')).map(el => {
      el.createdAt = el.updatedAt = new Date()
      // el.birth = new Date(el.birth).toLocaleString('en', { dateStyle: 'short' });
      return el
     })
     return queryInterface.bulkInsert('Profiles', data )
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null);

  }
};
