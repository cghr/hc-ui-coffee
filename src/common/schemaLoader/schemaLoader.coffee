do(app = angular.module 'myApp.schemaLoader', ['myApp.lodash'])->

  app.factory 'SchemaLoader', ($http, $q, $log, _) ->

    {
    loadAllSchemas: (schemaNames, schemaPath)->
      promises = _.map(schemaNames, (schema)->
        $http.get(schemaPath + schema))

      success = (responses) ->
        allSchemas = []
        _.each(responses, (resp)->
          allSchemas.push(resp.data)
        )
        return allSchemas

      error = -> $log.error 'Failed to load json schemas'


      $q.all(promises)
      .then(success, error)
    }
