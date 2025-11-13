module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nome: 'John Doe',
        isactive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'davi',
        isactive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
