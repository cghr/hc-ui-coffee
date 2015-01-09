do (app = angular.module('myApp.sync')) ->


  app.controller 'SyncCtrl', ($scope, ProgressService,
                              $interval, toaster, $timeout) ->
    $scope.total = {}
    $scope.pending = {}
    $scope.progress = {}


    $scope.networkStatusUpdater = $interval (-> updateNetworkStatus() ), 1000


    killUpdater=(promise) -> $interval.cancel(promise)

    networkStatusMsg = (status) ->
      if(status)
        {icon: 'icon-ok', type: 'success', msg: 'Wifi Connected Successfully!'}
      else
        {icon: 'icon-remove', type: 'danger', msg: 'Wifi Not Connected'}

    updateNetworkStatus = ->
      ProgressService.getNetworkStatus()
      .then (networkStatus) ->
        networkStatusMsg(networkStatus)
        if(networkStatus) then  killUpdater($scope.networkStatusUpdater)

    updateProgress= ->
      updateStatusOf('download')
      updateStatusOf('upload')
      updateStatusOf('fileupload')

    updateStatusOf=(statusType) ->
      ProgressService.getStatus()
      .then(data) ->
        if !$scope.total[statusType]
          $scope.total[statusType]=data
        else
          $scope.pending[statusType]=$scope.total[statusType]-data
          $scope.progress[statusType]=
            ($scope.total[statusType]-($scope.pending[statusType]))/100



    $scope.progressUpdater= $interval (-> updateProgress()),1500
    syncSuccess= -> killUpdater($scope.progressUpdater)
    $scope.startSync=->
      ProgressService.startSync()
      .then syncSuccess






