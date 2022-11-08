const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Move extends Model {}

Move.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    power: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accuracy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Move;