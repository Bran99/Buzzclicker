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

  var buffExtra  = new Audio("./assets/buffextra2.wav"),
      buffHeavy  = new Audio("./assets/buffheavy.wav"),
      buffDiesel = new Audio("./assets/diesel.wav"),
      buffHolyS  = new Audio("./assets/holys.wav");

  var buffSounds = [];
  buffSounds.push(buffExtra, buffHeavy, buffDiesel, buffHolyS);
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

    if (controller.level > levelCounter) {
      levelCounter += 1;
      buffSounds[levelCounter-1].play();
    }
  }

  ///////////////////////////////////////////
  //// UPGRADE DECREMENT AMOUNT (BELLY) /////
  ///////////////////////////////////////////
  this.increaseBelly = function () {
    $('.upgrade-belly-' + controller.bellyLevel).css('display', 'none');

    controller.bellyLevel++;

    $('.upgrade-belly-' + controller.bellyLevel).css('display', 'block');

    if ($('#belly').hasClass("increaseBelly" + (controller.bellyLevel - 1))) {
      document.getElementById("belly").setAttribute("class", "");
    };

    document.getElementById("belly").setAttribute("class", "increaseBelly" + controller.bellyLevel);

    $('#belly').hover( function() {
      $(this).css(
        "-webkit-animation-name", "inflate" + controller.bellyLevel,
        "-moz-animation-name", "inflate" + controller.bellyLevel
    )});

  };

}]);

///////////////////////////////////////////
//////// JQUERY ON CLICK FUNCTIONS ////////
///////////////////////////////////////////

$(document).ready(function() {
  var olmp1 = new Audio("./assets/olmp1.wav"),
      olmp2 = new Audio("./assets/olmp2.wav"),
      olmp3 = new Audio("./assets/olmp3.wav"),
      olmp4 = new Audio("./assets/olmp4.wav");

  var carlSounds = [];
  carlSounds.push(olmp1, olmp2, olmp3, olmp4);

  $('#carl').click(function(){
    $('#arm').css({
      "-webkit-animation-name":"moveArm",
      "-moz-animation-name":"moveArm"
    });
    $('#Eyes_Normal').attr({
      "display": "none"
    });
    $('#Eyes_Crossed').attr({
      "display": "visible"
    });
    $('#Mouth_Normal').attr({
      "display": "none"
    });
    $('#Mouth_Open').attr({
      "display": "visible"
    });

    carlSounds[Math.floor(Math.random()*4)].play();
	});

  $('#arm').bind('oanimationend animationend webkitAnimationEnd', function() {
    $('#arm').css({
     '-moz-animation-name': 'armReset',
     '-webkit-animation-name': 'armReset',
    });
    $('#Eyes_Normal').attr({
      "display": "visible"
    });
    $('#Eyes_Crossed').attr({
      "display": "none"
    });
    $('#Mouth_Normal').attr({
      "display": "visible"
    });
    $('#Mouth_Open').attr({
      "display": "none"
    });
  });
});
