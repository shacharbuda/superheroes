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
      type: DataTypes.JSON,
      allowNull: false
    },
    weaknesses: {
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