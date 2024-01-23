'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sepatus', [
      {
        nama: 'Sepatu A',
        merk:'Adindut',
        jenis: 'Sneakers',
        ukuran: '42',
        harga: 150.0,
        stok: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Sepatu B',
        merk: 'nayk',
        jenis: 'Boots',
        ukuran: '39',
        harga: 120.0,
        stok: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Tambahkan data sepatu lainnya sesuai kebutuhan
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sepatus', null, {});
  }
};
