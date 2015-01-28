do (app = angular.module('login')) ->


  app.controller 'LoginCtrl', ($scope, $rootScope,
                               $location, $window,
                               Auth, toaster, md5) ->


    vm=$scope
    vm.user={username:'demo',password:'demo'}
    vm.login = (data) ->
      user = {username: data.username, password: md5.createHash(data.password)}
      success = (resp) ->
        $rootScope.user = resp
        $location.path('/')

      fail = -> toaster.pop('error', '', 'Invalid username/password')
      Auth.login(user, success, fail)