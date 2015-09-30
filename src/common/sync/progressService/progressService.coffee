do (app = angular.module('progressService', ['toaster'])) ->
  app.factory 'ProgressService', ($http, $log, toaster, $rootScope) ->
    error = (msg) -> toaster.pop('error', '', msg)

    getErrMsg = (role)->
      if(role == 'user')
        "Sync Failed.Retry."
      else
        "Sync Failed.Check Internet connection.Retry"

    syncErrMsg = getErrMsg($rootScope.user.role.title)


    startSync: ->
      $http.get('api/sync/dataSync/'+$rootScope.user.role.title)
      .then ->
        toaster.pop('success', '', 'Sync Successful')
      , ->
        toaster.pop('error', '', syncErrMsg)



    getNetworkStatus: ->
      $http.get('api/sync/networkStatus')
      .then (resp) ->
        return resp.data.status
      , -> toaster.pop('error', '', 'Failed to get Network status')



    getStatus: (statusType) ->
      $http.get("api/sync/status/#{statusType}")
      .then (resp) ->
        return resp.data
      , -> toaster.pop('error', '', 'Failed to get status of' + statusType)


