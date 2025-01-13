const Sequelize = require('sequelize');
const sequelize = require('../db');

const Superhero = require('./superhero')(sequelize, Sequelize.DataTypes);
const Timer = require('./timer')(sequelize, Sequelize.DataTypes);


// sequelize.sync({force: true}); TODO: remove
sequelize.sync();

module.exports = {
  sequelize,
  Superhero,
  Timer,
};