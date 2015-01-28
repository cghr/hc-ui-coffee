do (app = angular.module('myApp.progressService', ['toaster'])) ->


  app.factory 'ProgressService', ($http, $log, toaster) ->

    error = -> toaster.pop('error', '', 'Failed.Try again later')


    startSync: () ->
      $http.get('api/sync/dataSync')
      .success -> toaster.pop('success', '', 'Sync Completed')
      .error -> error



    getNetworkStatus: () ->
      $http.get('api/sync/networkStatus')
      .success (networkStatus) -> return networkStatus
      .error -> error



    getStatus: (statusType) ->
      $http.get("api/sync/status/#{statusType}")
      .success (data) -> return data
      .error -> error


