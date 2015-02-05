do (app = angular.module('sideMenu', ['ui.router'])) ->


  app.directive 'sideMenu', ->


    {
    restrict: 'E'
    scope: {menuOptions: '=config'}
    templateUrl: 'sideMenu/sideMenu.jade'
    }