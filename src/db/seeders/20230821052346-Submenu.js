"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Submenus",
      [
        {
          name: "Submenu 1",
          masterMenuId: 1, // Assuming it's associated with MasterMenu with ID 1
          url: "/submenu-1",
          title: "Submenu Title 1",
          icon: "submenu-icon-1.png",
          ordering: 1,
          isTargetSelf: true,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Submenu 2",
          masterMenuId: 1, // Assuming it's associated with MasterMenu with ID 1
          url: "/submenu-2",
          title: "Submenu Title 2",
          icon: "submenu-icon-2.png",
          ordering: 2,
          isTargetSelf: false,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Submenu 3",
          masterMenuId: 2, // Assuming it's associated with MasterMenu with ID 2
          url: "/submenu-3",
          title: "Submenu Title 3",
          icon: "submenu-icon-3.png",
          ordering: 3,
          isTargetSelf: true,
          active: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Submenus", null, {});
  },
};
