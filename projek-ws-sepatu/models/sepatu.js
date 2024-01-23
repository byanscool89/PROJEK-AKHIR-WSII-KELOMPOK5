'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sepatu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sepatu.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
    },
    merk: {
      type: DataTypes.STRING, 
    },
    jenis: {
      type: DataTypes.STRING,
    },
    ukuran: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.DOUBLE, 
    },
    stok: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Sepatu',
  });
  return Sepatu;
};