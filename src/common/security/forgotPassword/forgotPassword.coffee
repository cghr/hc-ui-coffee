do (app = angular.module('forgotPassword', ['ui.router', 'auth'])) ->


  app.config ($stateProvider, routingConfig) ->

    access = routingConfig.accessLevels()

    $stateProvider.state('forgotPassword', {
      url: '/forgotPassword',
      templateUrl: '..//forgotPassword/forgotPassword.jade',
      controller: 'ForgotPasswordCtrl',
      controllerAs: 'forgotPassword',
      access: access.anon
    })

