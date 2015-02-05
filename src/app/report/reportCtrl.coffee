do(app = angular.module('myApp.report')) ->
  app.controller 'ReportCtrl', ($window, $scope) ->
    vm = $scope

    vm.reportOptions = {
      skin: 'dhx_skyblue',
      width: $window.innerWidth * 0.8 + 'px',
      height: $window.innerHeight * 0.8 + 'px'
    }

    vm.reportMenu = [
      {
        id: 1, label: 'Enumeration',
        items: [{id: 11, label: 'Areas'},
          {id: 12, label: 'Houses'}, {id: 13, label: 'Households'}
        , {id: 14, label: 'Members'}]
      },
      {
        id: 2, label: 'HHQ',
        items: [{id: 21, label: 'Members'}]
      }

    ]


