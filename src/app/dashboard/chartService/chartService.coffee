do(app = angular.module('myApp.chartService', [])) ->


  app.factory 'ChartService', ($http, $log) ->

    getData: (url) ->
      $http.get(url).success (data)-> return data
      .error -> $log.error 'Failed to load chart data'

    getPendingDownloads: ->
      getData('api/chart/pendingDownloads')



