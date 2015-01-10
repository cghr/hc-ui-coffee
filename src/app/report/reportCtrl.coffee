do(app = angular.module('myApp.report')) ->


  app.controller 'ReportCtrl', ($window) ->

    vm = this
    vm.reportOptions = {
      skin: 'dhx_skyblue',
      width: $window.innerWidth * 0.8 + 'px',
      height: $window.innerHeight * 0.8 + 'px'
    }

    vm.reportMenu = [
      {
        id: 1, label: 'Reports',
        items: [{id: 11, label: 'Areas'},
          {id: 12, label: 'Users'}]
      }
    ]


