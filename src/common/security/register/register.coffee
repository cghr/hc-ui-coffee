do (app=angular.module('register',['ui.router', 'auth', 'toaster'])) ->


  app.config ($stateProvider,routingConfig) ->

    access = routingConfig.accessLevels()
    $stateProvider.state('register', {
      url: "/register",
      controller: "RegisterCtrl",
      templateUrl: "..//register/register.jade",
      access: access.anon
    })