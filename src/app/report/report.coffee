do (app=angular.module('myApp.report',['ui.router','sideMenu'])) ->


  app.config ($stateProvider) ->

    $stateProvider.state('report',{
      url:'/report/:reportId',
      templateUrl:'report/report.jade',
      controller:'ReportCtrl'
    })