const Sequelize = require('sequelize');
const sequelize = require('../db');

const Superhero = require('./superhero')(sequelize, Sequelize.DataTypes);
const Timer = require('./timer')(sequelize, Sequelize.DataTypes);


// Add more models here TODO: remove
// const AnotherModel = require('./anotherModel')(sequelize, Sequelize.DataTypes);

sequelize.sync();

module.exports = {
  sequelize,
  Superhero,
  Timer,
  // Export more models here
  // AnotherModel
};