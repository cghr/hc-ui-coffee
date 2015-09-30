do(app = angular.module('myApp.idService', [])) ->


  app.factory 'IDService', ($http, $location, $log) ->

    getNextID: ->

      $http.get('api/IDService' + $location.url())
      .then (resp) ->
        console.log resp
        return resp.data.id
      , (err) ->
        $log.error('Error getting next id')
