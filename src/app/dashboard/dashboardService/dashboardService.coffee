do(app = angular.module('dashboardService', [])) ->


  app.factory 'DashboardService', ($http, $log) ->

    error = -> $log.error('error', '', 'Failed to get dashboard data')

    getData = (url) ->
      $http.get(url)
      .then ((resp)-> return resp.data), error

    progressOf: (context)->
      url = "api/dashboard/#{context}"
      getData(url)