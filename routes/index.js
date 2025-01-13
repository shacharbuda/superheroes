var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'S.H.E.I.L.D. agents data and communication center' });
});

module.exports = router;
