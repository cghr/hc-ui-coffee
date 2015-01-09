do (app=angular.module('myApp.report',['ui.router'])) ->


  app.config ($stateProvider) ->

    $stateProvider.state('report',{
      url:'/report',
      templateUrl:'report/report.jade',
      controller:'ReportCtrl',
      controllerAs:'vm'
    })