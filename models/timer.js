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
        model: 'Superheros',
        key: 'id',
      },
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    failureCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Timer;
};