var myApp = angular.module('myApp',[])

myApp.service('HistoryService', function($http) {

  var baseUrl = "http://localhost:8080/"

  this.saveWord = function (newWord) {
    var url = baseUrl + "saveCurrent"
    return $http.post(url, {"word": newWord})
  }
})

myApp.controller('MyController', function($scope, HistoryService) {
  
  // These $scope guys will be available in the HTML
  $scope.newWord = 'cat'

  $scope.saveThisWord = function () {
    HistoryService.saveWord( $scope.newWord )
    .then(saveSuccess, error)    
  }

  function saveSuccess (json) {
    console.log(json)
  }

  function error (err) {
    console.log(err)
  }
})