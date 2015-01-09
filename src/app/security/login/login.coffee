do (app = angular.module('login', [
  'ui.router'
  'auth'
  'toaster'
  'angular-md5'
])) ->


  app.config ($stateProvider, routingConfig) ->

    access = routingConfig.accessLevels()
    $stateProvider.state('login', {
      url: "/login",
      controller: "LoginCtrl",
      controllerAs: 'loginCtrl',
      templateUrl: "security/login/login.jade",
      access: access.anon
    })
