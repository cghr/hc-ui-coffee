do (app = angular.module "myApp") ->


  app.run ($state, $stateParams, $rootScope,
           JsonSchemaListService,
           SchemaLoader, _, $log, SchemaFactory) ->

    appName = 'hc'

    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams

    JsonSchemaListService.getSchemaList(appName)
    .then (schemas) ->
      loadSchemas(schemas)

    loadSchemas = (schemaNames) ->
      SchemaLoader.loadAllSchemas(schemaNames, 'assets/jsonSchema/')
      .then (schemas) ->
        cacheSchemas(schemaNames, schemas)

    cacheSchemas = (schemaNames, schemas) ->
      _.each(schemas, (schema, index)->
        SchemaFactory.put(schemaNames[index].replace(".json", ""), schema)
      )








