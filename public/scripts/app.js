var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  this.barWidth = 0;
  this.upgrades = 0;
  this.level    = 0;
  this.beerType;

  var controller = this;

  ///////////////////////////////////////////
  // TICK DRUNK METER DOWN EVERY 2 SECONDS //
  ///////////////////////////////////////////
  var interval = setInterval(function () {
    $http.post('/tick', { level : controller.level })
         .success(function (data) {
           controller.barWidth = data.drunkity + '%';
           controller.upgrades = data.drunkity;
         })
  }, 1000);

  ///////////////////////////////////////////
  // TICK DRUNK METER UP WHEN BEER CLICKED //
  ///////////////////////////////////////////
  this.drink = function () {
    // $('.arm').toggleClass('')
    $http.post('/drink', { level : controller.level })
         .success(function (data) {
           controller.barWidth = data.drunkity + '%';
           controller.upgrades = data.drunkity;
         })

    if (controller.upgrades >= 70) {
      $('.upgrade-5').css('display', 'block')
    } else if (controller.upgrades >= 50) {
      $('.upgrade-4').css('display', 'block')
    } else if (controller.upgrades >= 30) {
      $('.upgrade-3').css('display', 'block')
    } else if (controller.upgrades >= 15) {
      $('.upgrade-2').css('display', 'block')
    } else if (controller.upgrades >= 5) {
      $('.upgrade-1').css('display', 'block')
    }
  }

}]);
