const User = require('./User');
const Dev = require('./Dev');
const Move = require('./Move');

User.hasMany(Dev, {
  onDelete: 'CASCADE'
});

Dev.belongsTo(User);

Dev.hasMany(Move, {
  onDelete: 'CASCADE'
});

Move.belongsTo(Dev);

module.exports = { User, Dev, Move};
