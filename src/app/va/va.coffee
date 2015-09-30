do(app = angular.module('va', ['ui.router',
                               'myApp.dataGrid'])) ->
  app.config ($stateProvider) ->
    $stateProvider.state('va', {
      url: '/va'
      templateUrl: 'va/va.jade'
    }).state('va.area', {
      url: '/area'
      templateUrl: 'tpls/dataGridCentered.jade'
      title: 'Areas'
      msg: 'Select an Area'
      children: []
    }).state('va.areaDetail', {
      url: '/area/:areaId',
      templateUrl: 'tpls/pageDetail.jade',
      title: 'VA Deaths',
      data: {
        prev: {name: 'va.area', title: 'Areas'},
      }

    }).state('va.areaDetail.death', {
      url: '/vaDeath',
      templateUrl: 'tpls/dataGrid.jade'
      title: 'VA Deaths'

    })






