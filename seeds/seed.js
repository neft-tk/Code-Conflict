const sequelize = require('../config/connection');
const { User, Dev } = require('../models');

const userData = require('./userData.json');
const devData = require('./devData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const devs = await Dev.bulkCreate(devData);

  // for (const dev of devData) {
  //   await Dev.create({
  //     ...dev
  //   });
  // }

  process.exit(0);
};

seedDatabase();
