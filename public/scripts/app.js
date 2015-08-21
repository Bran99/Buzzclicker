var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  console.log("got in here bitchaz!");
  var interval = setInterval(function () {
    $http.get('/tick')
         .success(function (data) {
           console.log(data);
         })
  }, 2000);
}]);
