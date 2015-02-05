do (app = angular.module('login')) ->
  app.controller 'LoginCtrl', ($scope, $rootScope,
                               $location, $window,
                               Auth, toaster, md5) ->
    vm = $scope
    #vm.user={username:'demo',password:'demo'}
    vm.login = (username,password) ->
      data = {
        username: username,
        password: md5.createHash(password)
      }
      success = (resp) ->
        $rootScope.user = resp
        $location.path('/')
        username=''
        password=''

      fail = -> toaster.pop('error', '', 'Invalid username/password')
      Auth.login(data, success, fail)