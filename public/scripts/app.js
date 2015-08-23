var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  this.barWidth   = 0;
  this.upgrades   = 0;
  this.level      = 0;
  this.beers      = 0;
  this.bellyLevel = 1;
  this.beerType;
  this.barWidth;

  var controller = this;

var buff = new Audio("./assets/buff2.wav"),
buffExtra = new Audio("./assets/buffextra2.wav"),
buffHeavy = new Audio("./assets/buffheavy.wav"),
buffDiesel = new Audio("./assets/diesel.wav"),
buffHolyS = new Audio("./assets/holys.wav");


var buffSounds = [];
buffSounds.push(buff, buffExtra, buffHeavy, buffDiesel, buffHolyS);
var levelCounter = 0;

  ///////////////////////////////////////////
  //// TICK DRUNK METER DOWN EVERY SECOND ///
  ///////////////////////////////////////////
  var interval = setInterval(function () {
    $http.post('/tick', { level      : controller.level,
                          bellyLevel : controller.bellyLevel })
         .success(function (data) {
           controller.barWidth = data.drunkity + '%';
           controller.upgrades = data.drunkity;
          document.getElementById("blur").setAttribute("stdDeviation", data.drunkity/30);

          if (controller.level > levelCounter) {
            levelCounter += 1;
            buffSounds[levelCounter-1].play();
          }

         })
  }, 1000);

  ///////////////////////////////////////////
  // TICK DRUNK METER UP WHEN BEER CLICKED //
  ///////////////////////////////////////////
  this.drink = function () {
    controller.beers++;
    $http.post('/drink', { level : controller.level })
         .success(function (data) {
           controller.barWidth = data.drunkity + '%';
           controller.upgrades = data.drunkity;
         });
  };


  ///////////////////////////////////////////
  ///// UPGRADE EFFECTIVENESS OF CLICKS /////
  ///////////////////////////////////////////
  this.levelup = function (level) {
    console.log("level up");
    controller.level += level;
    $('.upgrade-' + controller.level).css('display', 'none');
    $('.upgrade-' + (level + 1)).css('display', 'block');
  }

  ///////////////////////////////////////////
  //// UPGRADE DECREMENT AMOUNT (BELLY) /////
  ///////////////////////////////////////////
  this.increaseBelly = function () {
    console.log('current belly level at ' + controller.bellyLevel);
    $('.upgrade-belly-' + controller.bellyLevel).css('display', 'none');
    $('.upgrade-belly-' + (controller.bellyLevel + 1)).css('display', 'block');
    controller.bellyLevel++;
    console.log("increase belly level to " + controller.bellyLevel);
  };

}]);
