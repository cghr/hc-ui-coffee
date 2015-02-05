do(app = angular.module('sync')) ->
  app.controller 'SyncCtrl', ($scope, ProgressService, $q, $timeout, $log) ->
    vm = $scope

    pollingFreq = {
      networkStatus: 2000,
      progress: 1000
    }

    networkStatusPolling = undefined
    progressPolling = undefined

    updateNetworkStatus = ->
      ProgressService.getNetworkStatus()
      .then (networkStatus) ->
        vm.networkStatus = networkStatus
        if(!networkStatus)
          networkStatusPolling =
            $timeout(updateNetworkStatus, pollingFreq.networkStatus)

    updateNetworkStatus()

    killNetworkStatusPolling = ->
      $timeout.cancel(networkStatusPolling)

    contexts = ['download', 'upload', 'fileupload']
    vm.total = {download: undefined, upload: undefined, fileupload: undefined}
    vm.progress = {download: 0, upload: 0, fileupload: 0}
    vm.pendingUploads=undefined

    calcProgress = (total, current)->
      (total - current) * 100 / total

    updateProgress = ->
      promises = contexts.map((context)->
        ProgressService.getStatus(context))
      $q.all(promises)
      .then (responses)->
        responses.forEach((response, index)->
          if(!vm.total[contexts[index]])
            vm.total[contexts[index]] = response
          vm.progress[contexts[index]] =
            calcProgress(vm.total[contexts[index]], response)
          vm.pendingUploads=responses[1]
        )
        progressPolling = $timeout(updateProgress, pollingFreq.progress)


    killPolling = ->
      console.log 'sync completed'
      vm.syncRequestActive = false
      $timeout.cancel(networkStatusPolling)
      $timeout.cancel(progressPolling)


    vm.startSync = ->
      vm.syncRequestActive = true
      updateProgress()
      ProgressService.startSync()
      .then(killPolling, killPolling)

    $scope.$on "$destroy", killPolling


