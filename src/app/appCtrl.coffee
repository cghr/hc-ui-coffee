do (app = angular.module "myApp") ->


  app.controller 'AppController', ($scope, $window, AppService) ->

    $scope.cleanup = ->
      confirmCleanup = $window.confirm("Are you sure ?")
      if(confirmCleanup)
        AppService.cleanup()

