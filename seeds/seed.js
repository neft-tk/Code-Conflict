const sequelize = require('../config/connection');
const { User, Dev, Move } = require('../models');

const userData = require('./userData.json');
const devData = require('./devData.json');
const moveData = require('./moveData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const devs = await Dev.bulkCreate(devData);

  const moves = await Move.bulkCreate(moveData);

  process.exit(0);
};

seedDatabase();
