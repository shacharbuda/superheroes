module.exports = (sequelize, DataTypes) => {
  const Timer = sequelize.define('Timer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    triggerDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://message-reciever.onrender.com/api/message'
    },
    superheroId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Superheroes', // name of the target model
        key: 'id', // key in the target model that we're referencing
      },
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Timer;
};