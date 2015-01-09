do (app = angular.module('myApp.sync', [
  'ui.router',
  'myApp.progressService',
  'toaster'
])) ->


  app.config ($stateProvider) ->

    $stateProvider.state('sync', {
      url: '/sync',
      templateUrl: '/sync.html',
      controller: 'syncCtrl'
    })