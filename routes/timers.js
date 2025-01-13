const express = require('express');
const router = express.Router();
const { Timer, Superhero } = require('../models');
const Consts = require('../config/consts');

/* GET timer listing by id. */
router.get('/:id', async function(req, res, next) {
  try {
    const timer = await Timer.findByPk(
      req.params.id,
      { include: {model: Superhero, attributes: ['firstName', 'lastName']} } // Include the superhero's full name (and only, for performance)
    ); 
    if (timer) {
      const now = new Date();
      const triggerDate = new Date(timer.triggerDate);
      const timeLeft = Math.max(0, Math.floor((triggerDate - now) / 1000)); // Time left in seconds
      res.json({ id: timer.id,
                 timeLeftInSeconds: timeLeft,
                 triggerDate: triggerDate,
                 isSent: timer.isSent,
                 isTryToSent: !timer.isSent && timer.failureCount < Consts.MAX_FAILURE_COUNT,
                 url: timer.url,
                 message: timer.message,
                 senderSuperheroId: timer.superheroId,
                 senderSuperheroFullName: timer.Superhero.fullName }); 
    } else {
      res.status(404).send('Timer not found');
    }
  } catch (err) {
    next(err);
  }
});

/* POST create a new timer */
router.post('/', async function(req, res, next) {
  try {
    const { message, url, superheroId, hours, minutes, seconds } = req.body;

    // Check if the superhero exists
    const superhero = await Superhero.findByPk(superheroId);
    if (!superhero) {
      return res.status(404).send('Superhero not found');
    }

    // Calculate the trigger date
    const now = new Date();
    const triggerDate = new Date(now.getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000);

    const timer = await Timer.create({
      triggerDate,
      url,
      superheroId,
      message
    });
    res.status(201).json(timer);
  } catch (err) {
    next(err);
  }
});

module.exports = router;