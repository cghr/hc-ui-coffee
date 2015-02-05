do (app = angular.module('sync', [
  'ui.router',
  'progressService',
  'toaster',
  'ui.bootstrap'
])) ->


  app.config ($stateProvider) ->

    $stateProvider.state('sync', {
      url: '/sync',
      templateUrl: 'sync/sync.jade',
      controller: 'SyncCtrl'
    })