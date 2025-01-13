var express = require('express');
var router = express.Router();
var { Superhero, Timer } = require('../models');

/* GET superhero listing by id. */
router.get('/:id', async function(req, res, next) {
  try {
    const superhero = await Superhero.findByPk(req.params.id,
      { include:{model: Timer, attributes: ['id', 'message', 'isSent'] }} // Include the superhero's timers, but only the message and isSent attributes for performance.
    );
    if (superhero) {
      const {id, alias, firstName, lastName, fullName, powers, weaknesses, origin, isGood} = superhero;
      const sentMessages = superhero.Timers.filter(timer => timer.isSent).map(t => ({timerId: t.id, message: t.message}));
      const remainingMessages = superhero.Timers.filter(timer => !timer.isSent).map(t => ({timerId: t.id, message: t.message}));
      res.json({
        id,
        alias,
        firstName,
        lastName,
        fullName,
        powers,
        weaknesses,
        origin,
        isGood,
        sentMessages,
        remainingMessages
      });
    } else {
      res.status(404).send(`Superhero with id ${req.params.id} not found`);
    }
  } catch (err) {
    next(err);
  }
});

/* Post superhero listing */
router.post('/', async function(req, res, next) {
  try {
    const superhero = await Superhero.create({
      alias: req.body.alias,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      powers: req.body.powers,
      weaknesses: req.body.weaknesses,
      origin: req.body.origin,
      isGood: req.body.isGood
    });
    res.json(superhero);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
