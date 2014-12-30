do(app = angular.module 'myApp.lodash', []) ->

  app.factory '_', ($window)->
    _ = $window._

    delete $window._
    return _



