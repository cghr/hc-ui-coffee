do (app = angular.module('myApp.dataGrid', [
  'ui.router',
  'cgGrid',
  'myApp.appService',
  'myApp.lodash'
])) ->


  app.controller 'DataGridCtrl', ($scope, GridFactory,
                                  $state, AppService,
                                  $stateParams) ->

    $scope.canAddMore = true
    mappings = {
      '': {entity: '', obj: '', next: '', variable: ''}
    }


    GridFactory.getData()
    .then  ->
      actualCount = (GridFactory.data).data.rows.length
      stateName = ($state.current.name).split('.')
      mapping = mappings[_.last(stateName)]
      $scope.nextState = mapping.next

      AppService.getData(mapping.entity, $stateParams['something'])
      .then (data) -> $scope.canAddMore = (actualCount < data)






