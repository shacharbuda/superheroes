const { Sequelize } = require('sequelize');
const { Superhero, Timer } = require('../models');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

async function setupTestDB() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  Superhero.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  }, { sequelize, modelName: 'Superhero' });

  Timer.init({
    triggerDate: Sequelize.DATE,
    isSent: Sequelize.BOOLEAN,
    failureCount: Sequelize.INTEGER,
    url: Sequelize.STRING,
    message: Sequelize.STRING,
  }, { sequelize, modelName: 'Timer' });

  Superhero.hasMany(Timer, { foreignKey: 'superheroId' });
  Timer.belongsTo(Superhero, { foreignKey: 'superheroId' });

  await sequelize.sync({ force: true });

  return sequelize;
}

module.exports = setupTestDB;