do(app = angular.module('myApp.appService', ['toaster'])) ->


  app.factory 'AppService', ($http, toaster)->

    errorCallback = -> toaster.pop('error', '', 'Failed to fetch data')

    cleanup: ->
      $http.get('api/data/cleanup')
      .then((-> toaster.pop('success', '', 'Cleaned up Successfully')),
        errorCallback)

    getData: (entity, entityId) ->
      $http.get("api/entity/#{entity}/#{entityId}")
      .then ((resp)-> return resp.data), errorCallback

    postData:(entity,postData)->
      $http.post("api/entity/#{entity}",postData)









