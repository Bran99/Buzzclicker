var express = require('express'),
    router = express.Router();

var drunkity = 0;
var level;

router.get('/', function (req, res) {
  res.render('buzzclicker');
})

///////////////////////////////////////////
//// TICK DRUNK METER DOWN EVERY SECOND ///
///////////////////////////////////////////
router.post('/tick', function (req, res) {
  if (drunkity > 0) {
    drunkity -= (req.body.level + 1) / (1 /(req.body.bellyLevel + 1));
  }

  if (drunkity < 0) {
    drunkity = 0;
  }

  res.json({ drunkity : drunkity });
});

///////////////////////////////////////////
// TICK DRUNK METER UP WHEN BEER CLICKED //
///////////////////////////////////////////
router.post('/drink', function (req, res) {
  level = req.body.level;


  if (level === 0) {
    drunkity += 0.15;
  } else {
    drunkity += level * .25
  }

  if (drunkity > 100) {
    drunkity = 100;
  }

  res.json({ drunkity : drunkity })
})

module.exports = router;
