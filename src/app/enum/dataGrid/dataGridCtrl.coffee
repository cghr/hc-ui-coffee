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
        variable: 'totalMembers', next: 'enum.householdDetail.commonQs'
      },
      'hosp': {
        entity: 'hospInf',
        variable: 'hospCount', next: 'enum.householdDetail.deathInf'
      },
      'death': {
        entity: 'deathInf',
        variable: 'deathCount', next: 'enum.householdDetail.contact'
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
        $scope.canAddMore = (actualCount < data[mapping.variable])






