"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MasterMenus", [
      {
        name: "Menu 1",
        icon: "icon1.png",
        ordering: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Menu 2",
        icon: "icon2.png",
        ordering: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Menu 3",
        icon: "icon3.png",
        ordering: 3,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("MasterMenus", null, {});
  },
};
