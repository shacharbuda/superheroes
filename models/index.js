const Sequelize = require('sequelize');
const sequelize = require('../db');

const Superhero = require('./superhero')(sequelize, Sequelize.DataTypes);
const Timer = require('./timer')(sequelize, Sequelize.DataTypes);

Superhero.hasMany(sequelize.models.Timer, { foreignKey: 'superheroId' });
Timer.belongsTo(sequelize.models.Superhero, { foreignKey: 'superheroId' });


sequelize.sync();

module.exports = {
  sequelize,
  Superhero,
  Timer,
};