do(app = angular.module 'myApp.lodash', []) ->

  app.factory '_', ($window)->

    return $window._



