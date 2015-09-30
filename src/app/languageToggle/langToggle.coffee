do (app = angular.module('langToggle', []))->
  app.factory('Lang', ($http)->
    switch: ->
      console.log('Language Switched')
      $http.get('api/langToggle')
  )