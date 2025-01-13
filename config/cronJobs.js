const cron = require('node-cron');
const axios = require('axios');
const { Timer } = require('../models');
const Sequelize = require('sequelize');
const Consts = require('./consts');

// Function to execute the cron job
async function sendDueMessagesByTimers() {
  const transaction = await Timer.sequelize.transaction();
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
      },
      lock: true,
      skipLocked: true,
      transaction
    });

    console.log(`Found ${timers.length} timers to send`);

    // Send POST request for each timer
    for (const timer of timers) {
      try {
        await axios.post(timer.url, { message: timer.message });
        // Update the timer to mark it as sent
        timer.isSent = true;
        await timer.save({ transaction });
      } catch (err) {
        console.error(`Error sending POST request for timer ID ${timer.id}:`, err);
        // Increment the failure count
        timer.failureCount += 1;
        await timer.save({ transaction });
      }
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.error('Error executing cron job:', err);
  }
}

// Schedule the cron job to run every 10 seconds
const scheduledTask = cron.schedule('*/10 * * * * *', sendDueMessagesByTimers);

// Run the cron job immediately on startup
sendDueMessagesByTimers();

// allow the cron job to be stopped, for testing
function stopScheduledTask() {
  scheduledTask.stop();
}

module.exports = { sendDueMessagesByTimers, stopScheduledTask }; // for testing purposes