const cron = require('node-cron');
const axios = require('axios');
const { Timer } = require('../models');
const Sequelize = require('sequelize');

// Schedule a task to run every minute
cron.schedule('* * * * *', async () => {
  try {
    // Find all timers where isSent is false and triggerDate has passed
    const timers = await Timer.findAll({
      where: {
        isSent: false,
        triggerDate: {
          [Sequelize.Op.lte]: new Date()
        }
      }
    });

    // Send POST request for each timer
    for (const timer of timers) {
      try {
        await axios.post(timer.url, { message: timer.message });
        // Update the timer to mark it as sent
        timer.isSent = true;
        await timer.save();
      } catch (error) {
        console.error(`Failed to send message for timer ${timer.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error fetching timers:', error);
  }
});