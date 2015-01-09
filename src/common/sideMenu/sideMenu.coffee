do (app = angular.module('sideMenu', [])) ->


  app.directive 'sideMenu', ->


    {
    restrict: 'E'
    scope: {config: '='}
    templateUrl: 'sideMenu/sideMenu.html'
    }