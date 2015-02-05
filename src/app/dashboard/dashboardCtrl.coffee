do (app = angular.module('dashboard')) ->


  app.controller 'Dashboard', ($scope, $timeout,
                               DashboardService, $q, _, $log) ->

    vm = $scope

    vm.progress = {}
    contexts = ['enum', 'hhq', 'downloads']

    liveUpdate = undefined

    updateDashboard = ->
      promises = contexts
      .map((context) -> DashboardService.progressOf(context))

      $q.all(promises)
      .then (responses)->
        responses.forEach((resp, index)->
          vm.progress[contexts[index]] = resp
        )
        liveUpdate = $timeout(updateDashboard, 5000)

    updateDashboard()

    $scope.$on "$destroy", (->
      $log.info('killed dashboard live update')
      $timeout.cancel(liveUpdate)
    )














