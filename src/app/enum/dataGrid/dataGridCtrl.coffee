do (app = angular.module('myApp.dataGrid', [
  'ui.router',
  'cgGrid',
  'myApp.appService',
  'myApp.lodash'
])) ->
  app.controller 'DataGridCtrl', ($scope, GridFactory,
                                  $state, AppService,
                                  $stateParams, _) ->
    $scope.canAddMore = true
    mappings = {
      'member': {
        entity: 'household',
        variable: 'householdCount', next: 'enum.householdDetail.commonQs'
      },
      'death': {
        entity: 'deathInf',
        variable: 'deceasedCount', next: 'enum.householdDetail.esl'
      }
    }


    GridFactory.getData()
    .then ->
      actualCount = (GridFactory.data).data.rows.length
      stateName = ($state.current.name).split('.')
      mapping = mappings[_.last(stateName)]
      $scope.nextState = mapping.next

      AppService.getData(mapping.entity, $stateParams['householdId'])
      .then (data) ->
        if(data.householdCount)
          $scope.canAddMore = (actualCount < data[mapping.variable]-1)
        else
          $scope.canAddMore = (actualCount < data[mapping.variable])






