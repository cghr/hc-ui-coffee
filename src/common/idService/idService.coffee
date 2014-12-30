do(app = angular.module('myApp.idService', [])) ->

  app.factory 'IDService', ($http, $location, $log)->

    {
    getNextID: ()->
      $http.get('api/IDService' + $location.url())
      .success (data)-> return data.id
      .error -> $log.error('Error getting next id')
    }