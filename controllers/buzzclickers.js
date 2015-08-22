var express = require('express'),
    router = express.Router();

var drunkity = 0;
var level;

router.get('/', function (req, res) {
  res.render('buzzclicker');
})

///////////////////////////////////////////
// TICK DRUNK METER DOWN EVERY 2 SECONDS //
///////////////////////////////////////////
router.post('/tick', function (req, res) {
  if (drunkity > 0) {
    drunkity -= .75;
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
  
  if (drunkity <= 100) {
    if (level === 0) {
      drunkity += 0.15;
    } else if (level === 1) {
      drunkity += 0.30;
    } else if (level === 2) {
      drunkity += 0.5;
    } else if (level === 3) {
      drunkity += 0.75;
    } else if (level === 4) {
      drunkity += 1;
    }
  }


  res.json({ drunkity : drunkity })
})

module.exports = router;
