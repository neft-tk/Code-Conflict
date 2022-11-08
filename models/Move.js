const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Move extends Model {}

Move.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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
    dev_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dev',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dev',
  }
);

module.exports = Move;