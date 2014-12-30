do(app = angular.module 'myApp.jQuery', []) ->

  app.factory 'jQuery', ($window)->
    jQuery = $window.jQuery

    delete $window.jQuery
    return jQuery



