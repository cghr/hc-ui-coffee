do(app = angular.module('myApp.appService', ['toaster'])) ->


  app.factory 'AppService', ($http, toaster)->

    cleanup: ->
      $http.get('api/data/cleanup')
      .success ()-> toaster.pop('success', '', 'Cleaned up Successfully')
      .error -> toaster.pop('error', '', 'Failed to fetch data')

    getData: (entity, entityId) ->
      $http.get("api/entity/#{entity}/#{entityId}")
      .success (data)-> return data
      .error -> toaster.pop('error', '', 'Failed to fetch data')



