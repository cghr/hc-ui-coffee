do (app = angular.module('register')) ->


  app.controller 'RegisterCtrl', ($rootScope, $scope,
                                  $location, Auth, toaster) ->

    $scope.role = Auth.userRoles.user
    $scope.userRoles = Auth.userRoles

    $scope.register = (user)->
      toaster.pop('info', "Alert", "Registration successful !")
      Auth.register(user,
        (-> $location.path('/')),
        ((err) -> $rootScope.error = err))
