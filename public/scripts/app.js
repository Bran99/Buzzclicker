var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  this.barWidth = 0;
  this.level = 0;

  var controller = this;

  ///////////////////////////////////////////
  // TICK DRUNK METER DOWN EVERY 2 SECONDS //
  ///////////////////////////////////////////
  var interval = setInterval(function () {
    $http.post('/tick')
         .success(function (data) {
           controller.barWidth = data.drunkity;
           console.log(data);
         })
  }, 2000);

  ///////////////////////////////////////////
  // TICK DRUNK METER UP WHEN BEER CLICKED //
  ///////////////////////////////////////////
  this.drink = function(level) {
    $http.post('/drink', { level : level })
         .success(function (data) {
           console.log(data);
         })
  }
}]);
