do(app = angular.module('myApp.areaResolver',
  ['myApp.appService', 'ui.router'])) ->
  app.config ($stateProvider)->
    $stateProvider.state('areaResolver', {
      url: '/enum/area/areaResolver/:areaId'
      templateUrl: 'areaResolver/areaResolver.jade',
      controller: 'AreaResolverCtrl'
    })


  app.controller 'AreaResolverCtrl', ($scope, $http, $stateParams,
                                      AppService, $state)->
    areaId = $stateParams['areaId']


    AppService.getData('area', areaId)
    .then (data)->
      $scope.subject = data
      nextState = 'enum.areaDetail.house'
      $scope.proceed = ->
        $state.go(nextState, $stateParams)




