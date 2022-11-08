const User = require('./User');
const Dev = require('./Dev');

User.hasMany(Dev, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dev.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Dev };
