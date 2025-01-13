const cron = require('node-cron');
const axios = require('axios');
const { Timer } = require('../models');
const Sequelize = require('sequelize');

// Function to execute the cron job
async function executeCronJob() {
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
      } catch (err) {
        console.error(`Error sending POST request for timer ID ${timer.id}:`, err);
      }
    }
  } catch (err) {
    console.error('Error executing cron job:', err);
  }
}

// Schedule the cron job to run every minute
cron.schedule('* * * * *', executeCronJob);

// Run the cron job immediately on startup
executeCronJob();