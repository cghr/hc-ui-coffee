do (app = angular.module "myApp.home", [
  'ui.router'
]) ->


  app.config ($stateProvider) ->

    $stateProvider.state 'home',
      url: '/home'
      controller: 'HomeController'
      templateUrl: 'home/home.jade'



  app.controller 'HomeController', ($scope) ->
    init = ->


    init()

