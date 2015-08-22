var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  this.barWidth = 0;
  this.upgrades = 0;
  this.level    = 0;
  this.beers    = 0;
  this.beerType;

  var controller = this;

  ///////////////////////////////////////////
  //// TICK DRUNK METER DOWN EVERY SECOND ///
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
    controller.beers++;
    $http.post('/drink', { level : controller.level })
         .success(function (data) {
           controller.barWidth = data.drunkity + '%';
           controller.upgrades = data.drunkity;
         })

    if (controller.upgrades >= 70 || controller.beers >= 25) {
      $('.upgrade-5').css('display', 'block')
    } else if (controller.upgrades >= 50 || controller.beers >= 20) {
      $('.upgrade-4').css('display', 'block')
    } else if (controller.upgrades >= 30 || controller.beers >= 15) {
      $('.upgrade-3').css('display', 'block')
    } else if (controller.upgrades >= 15 || controller.beers >= 10) {
      $('.upgrade-2').css('display', 'block')
    } else if (controller.upgrades >= 5 || controller.beers >= 5) {
      $('.upgrade-1').css('display', 'block')
    }
  }

  this.levelup = function () {
    controller.level++;
    $('.upgrade-' + controller.level).css('display', 'none');
    $('.upgrade-' + (controller.level + 1)).css('display', 'block')
  }

}]);
