do (app = angular.module('dashboard', ['ui.grid',
                                       'dashboardService',
                                       'ui.router','toaster'
                                       ])) ->
  app.config ($stateProvider) ->
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.jade',
      controller: 'Dashboard'
    })





