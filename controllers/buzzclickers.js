var express = require('express'),
    router = express.Router();

var drunkity = 0;

router.get('/', function (req, res) {
  res.render('buzzclicker');
})

router.get('/tick', function (req, res) {
  if(drunkity !== 0) {
    drunkty -= .5;
  }
  res.json({ drunkity : drunkity });
});

module.exports = router;
