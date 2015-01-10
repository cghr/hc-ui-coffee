do (app = angular.module "myApp") ->


  app.run ($state, $stateParams, $rootScope,
           JsonSchemaListService,
           SchemaLoader, _, $log, SchemaFactory) ->

    appName = 'kickstart'

    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams

    JsonSchemaListService.getSchemaList(appName)
    .then (schemaNames) -> loadSchemas(schemaNames)

    loadSchemas = (schemaNames) ->
      SchemaLoader.loadAllSchemas(schemaNames, 'assets/jsonSchema/')
      .then (schemas)-> cacheSchemas(schemaNames, schemas)

    cacheSchemas = (schemaNames, schemas) ->
      _.each(schemas, (schema, index)->
        SchemaFactory.put(schemaNames[index].replace(".json", ""), schema)
      )








