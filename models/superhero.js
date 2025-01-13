module.exports = (sequelize, DataTypes) => {
  const Superhero = sequelize.define('Superhero', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    powers: {
      // for MVP, we will store powers as a JSON object.
      // In the future, we may want to create a separate table for powers and link them to superheroes
      type: DataTypes.JSON, 
      allowNull: false
    },
    weaknesses: {
      // for MVP, we will store weaknesses as a JSON object. (see powers above)
      type: DataTypes.JSON,
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isGood: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    // Other model options go here TODO: remove
  });

  return Superhero;
};