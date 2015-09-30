do(app = angular.module('myApp.restore',
  ['ui.router'])) ->
  app.config ($stateProvider)->
    $stateProvider.state('restore', {
      url: '/restore'
      templateUrl: 'restore/restore.jade',
      controller: 'restoreCtrl'
    })

  app.controller('restoreCtrl', ($rootScope,$state)->

    restoreSession = ->
      console.log('restoring previous session')
      console.log($rootScope.restoreSession)
      state = $rootScope.restoreSession.state
      params = $rootScope.restoreSession.params
      $state.go(state,JSON.parse(params))

    restoreSession()
  )

