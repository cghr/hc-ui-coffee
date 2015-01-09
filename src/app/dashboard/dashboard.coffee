do(app = angular.module('myApp.dashboard', [
  'ui.router'
  'angularCharts'
  'myApp.lodash'
  'myApp.chartService'

])) ->


  app.config ($stateProvider) ->


    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.jade',
      controller: 'DashboardCtrl',
      controllerAs:'dashboard'
    })



