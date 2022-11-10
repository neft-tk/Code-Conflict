const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Dev extends Model {}

Dev.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    current_exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
    alignment: {
      type: DataTypes.ENUM('Front-End','Back-End'),
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Dev;
