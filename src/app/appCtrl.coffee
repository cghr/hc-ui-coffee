do (app = angular.module "myApp") ->


  app.controller 'AppController', ($scope, $window,
                                   AppService, IDService,
                                   $state, $rootScope, StateTransitions) ->


    transitionState = (currentState, nextID) ->
      stateObject = StateTransitions[currentState]
      if(nextID)
        $rootScope.$stateParams[stateObject.param] = nextID
      $state.go(stateObject.to, $rootScope.$stateParams)

    $scope.appRoot={}

    $scope.appRoot.addNew = ->
      IDService.getNextID()
      .success (id) -> transitionState($state.current.name, id)
      .error -> transitionState($state.current.name, undefined)


    $scope.cleanup = ->
      confirmCleanup = $window.confirm("Are you sure ?")
      if(confirmCleanup)
        AppService.cleanup()




