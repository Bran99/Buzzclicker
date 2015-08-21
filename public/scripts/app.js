var app = angular.module('buzzClicker',[]);

app.controller('buzzClickerController', ["$http", "$scope", function($http, $scope){
  interval = setInterval(function () {
    $http.post('/tick')
         .success(function (data) {
           console.log(data);
         })
  }, 1000)
});
