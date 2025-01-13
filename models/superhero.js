module.exports = (sequelize, DataTypes) => {
  const SuperheroBase = sequelize.define('Superhero', {
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
  });

  class Superhero extends SuperheroBase {
    get fullName() {
      // capitalize the first letter of the first name and last name
      return `${this.firstName.charAt(0).toUpperCase()}${this.firstName.slice(1)} ${this.lastName.charAt(0).toUpperCase()}${this.lastName.slice(1)}`;
    }
  }

  return Superhero;
};