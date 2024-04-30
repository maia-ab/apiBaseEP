'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alquilable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alquilable.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disponible: DataTypes.BOOLEAN,
    precio: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'alquilable',
    tableName: 'rentable'
  });
  return alquilable;
};