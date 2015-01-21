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
      'member': {
        entity: 'household', obj: 'household',
        variable: 'totalMembers', next: 'enum.householdDetail.commonQs'
      },
      'hosp': {
        entity: 'hospInf', obj: 'hospInf',
        variable: 'hospCount', next: 'enum.householdDetail.deathInf'
      },
      'death': {
        entity: 'deathInf', obj: 'deathInf',
        variable: 'deathCount', next: 'enum.householdDetail.contact'
      }
    }


    GridFactory.getData()
    .then ->
      console.log GridFactory.data
      actualCount = (GridFactory.data).data.rows.length
      stateName = ($state.current.name).split('.')
      mapping = mappings[_.last(stateName)]
      $scope.nextState = mapping.next

      AppService.getData(mapping.entity, $stateParams['something'])
      .then (data) -> $scope.canAddMore = (actualCount < data)






