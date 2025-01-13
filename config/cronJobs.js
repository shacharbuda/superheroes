const cron = require('node-cron');
const axios = require('axios');
const { Timer } = require('../models');
const Sequelize = require('sequelize');
const Consts = require('./consts');

// Function to execute the cron job
async function sendDueMessagesByTimers() {
  try {
    // Find all timers where isSent is false and triggerDate has passed
    const timers = await Timer.findAll({
      where: {
        isSent: false,
        failureCount: {
          [Sequelize.Op.lt]: Consts.MAX_FAILURE_COUNT
        },
        triggerDate: {
          [Sequelize.Op.lte]: new Date()
        }
      }
    });

    console.log(`Found ${timers.length} timers to send`);

    // Send POST request for each timer
    for (const timer of timers) {
      try {
        await axios.post(timer.url, { message: timer.message });
        // Update the timer to mark it as sent
        timer.isSent = true;
      } catch (err) {
        console.error(`Error sending POST request for timer ID ${timer.id}:`, err);
        timer.failureCount++;
      } finally {
        // regardless of success or failure, update the timer
        await timer.save();
      }
    }
  } catch (err) {
    console.error('Error executing cron job:', err);
  }
}

// Schedule the cron job to run every minute
cron.schedule('* * * * *', sendDueMessagesByTimers);

// Run the cron job immediately on startup
sendDueMessagesByTimers();