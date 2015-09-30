do (app = angular.module "myApp") ->
  app.run ($state, $stateParams, $rootScope,
           JsonSchemaListService,
           SchemaLoader, _, $log, SchemaFactory, Lang, Audio) ->
    appName = 'mvm'

    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
    $rootScope.lang = ''

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


    #Audio Recording start/stop
    $rootScope.$on('$stateChangeSuccess', (event, toState)->
      deathId = $rootScope.$stateParams['deathId']
      state = toState.name
      isSteps = -> state.indexOf('steps') > -1
      isVaDetail = -> state.indexOf('vaDetail') > -1
      isEslDetail = -> state.indexOf('eslDetail') > -1

      if(isSteps() || isVaDetail() || isEslDetail())
        $rootScope.restoreSession = {
          state: state,
          params: JSON.stringify($rootScope.$stateParams)
        }


      if(toState.name == 'steps.step1')
        Audio.start('full', deathId)

      else if(toState.name == 'steps.step5')
        deathId = $rootScope.$stateParams['deathId']
        Audio.stop(deathId, 'full').then(-> Audio.start('summary', deathId))
    )
















