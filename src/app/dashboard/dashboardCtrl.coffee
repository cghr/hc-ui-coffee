do (app = angular.module('dashboard')) ->
  app.controller 'Dashboard', ($scope, $timeout,
                               DashboardService, $q, $log, $http,toaster) ->
    vm = $scope

    vm.progress = {}
    contexts = ['va', 'esl', 'downloads']

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

    vm.distributeData = ->

      done = -> toaster.pop('success','','Distribution Successful')
      fail = -> toaster.pop('error','','Distribution Failed')
      $http.get('api/distribute')
      .then(done,fail)















