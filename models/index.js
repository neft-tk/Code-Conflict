const User = require('./User');
const Dev = require('./Dev');
const Move = require('./Move');

User.hasMany(Dev, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dev.belongsTo(User, {
  foreignKey: 'user_id'
});

Dev.hasMany(Move, {
  foreignKey: 'move_id',
  onDelete: 'CASCADE'
});

Move.belongsTo(Dev, {
  foreignKey: 'user_id'
});

module.exports = { User, Dev };
