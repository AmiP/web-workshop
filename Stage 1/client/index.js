var myApp = angular.module('myApp',[])

myApp.controller('MyController', function($scope) {
  
  // These $scope guys will be available in the HTML
  $scope.newWord = 'cat'

})