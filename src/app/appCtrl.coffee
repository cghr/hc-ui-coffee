do (app = angular.module "myApp") ->

  app.controller 'AppController', ($scope, $window, AppService) ->

    $scope.cleanup = ->
      confirm = $window.confirm("Are you sure ?")
      if(confirm)
        AppService.cleanup()

