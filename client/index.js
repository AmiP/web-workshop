var myApp = angular.module('myApp',[])

myApp.service('HistoryService', function($http) {

  var baseUrl = "http://localhost:8080/"

  this.saveWord = function (newWord) {
    var url = baseUrl + "saveCurrent"
    return $http.post(url, {"word": newWord})
  }

  this.getSaved = function () {
    var url = baseUrl + "getSaved"
    return $http.get(url)
  }
})

myApp.service('GifService', function($http) {

  var baseUrl = "https://api.giphy.com/v1/gifs/"
  var apiKey = "dc6zaTOxFJmzC"

  this.getGifs = function (query) {
    var url = baseUrl + "search?q=" + query + "&api_key=" + apiKey
    return $http.get(url)
  }

  this.getReactionGifs = function (query) {
    var url = baseUrl + "search?q=" + query + "+reaction&api_key=" + apiKey
    return $http.get(url)
  }

  this.getFunnyGifs = function (query) {
    var url = baseUrl + "search?q=" + query + "+funny&api_key=" + apiKey
    return $http.get(url)
  }
})

myApp.controller('MyController', function($scope, GifService, HistoryService) {
  
  // These $scope guys will be available in the HTML
  $scope.words = []
  $scope.newWord = 'cat'
  $scope.gifUrl = '' 

  $scope.saveThisWord = function () {
    HistoryService.saveWord( $scope.newWord )
    .then(saveSuccess, error)    
  }

  $scope.getSavedWords = function() {
    HistoryService.getSaved()
    .then(loadSuccess, error)
  }
  
  $scope.showGifs = function($event) {
    GifService.getGifs( $event.currentTarget.innerHTML )
    .then(gifSuccess, error)
  }

  function saveSuccess (json) {
    // console.log(json)
  }

  function loadSuccess (json) {
    $scope.words = json.data
  }

  function gifSuccess (json) {
    if (json.data.data[0]) {
      $scope.gifUrl = json.data.data[0].images.fixed_height.url      
    } else {
      $scope.gifUrl = "http://www.dailyrounds.org/blog/wp-content/uploads/2015/10/i-dont-know.jpg"
    }
  }

  function error (err) {
    console.log(err)
  }
})