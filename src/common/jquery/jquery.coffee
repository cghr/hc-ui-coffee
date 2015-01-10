do(app = angular.module 'myApp.jQuery', []) ->


  app.factory 'jQuery', ($window)->

    return $window.jQuery



