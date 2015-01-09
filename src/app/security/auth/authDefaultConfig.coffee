do (app=angular.module('authDefaultConfig', [])) ->

  app.factory 'AuthDefaultConfig',()->


    authUrl: 'api/security/auth'
    registerUrl: 'api/user'
    logoutUrl: 'api/security/logout'