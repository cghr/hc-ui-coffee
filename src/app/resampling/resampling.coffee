do (app = angular.module('resampling', ['ui.router'])) ->
  app.config ($stateProvider) ->
    $stateProvider.state('resampling', {
      url: '/resampling',
      templateUrl: 'resampling/resampling.jade',
      controller: 'ResamplingCtrl'
    }).state('resamplingSurvey', {
      url: '/resampling/:memberId',
      templateUrl: 'tpls/resampling.jade'
    })


  app.controller 'ResamplingCtrl', ($scope, $stateParams,
                                    $http, $state)->
    vm = $scope
    $http.get('api/resampling')
    .then (resp)->
      vm.resampling = resp.data
      console.log(resp.data)

    vm.resampleSurvey = (memberId) ->
      $stateParams['memberId'] = memberId
      $state.go('resamplingSurvey', $stateParams)