var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  this.barWidth = 0;
  this.level    = 0;
  this.beerType;

  var controller = this;

  ///////////////////////////////////////////
  // TICK DRUNK METER DOWN EVERY 2 SECONDS //
  ///////////////////////////////////////////
  var interval = setInterval(function () {
    $http.post('/tick')
         .success(function (data) {
           controller.barWidth = data.drunkity + '%';
           console.log(data);
           console.log(controller.level);
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
           console.log(data);
         })
  }

}]);
