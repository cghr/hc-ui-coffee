do (app = angular.module "myApp") ->
  app.controller 'AppController', ($scope, $window,
                                   AppService, IDService,
                                   $state, $rootScope,
                                   StateTransitions,
                                   $http, _, $stateParams,
                                   $modal, $q, toaster, $log,
                                   JsonSchemaListService,
                                   SchemaLoader,
                                   SchemaFactory,
                                   Audio, Lang) ->



    transitionState = (currentState, nextID) ->
      stateObject = StateTransitions[currentState]
      if(nextID)
        $rootScope.$stateParams[stateObject.param] = nextID
      $state.go(stateObject.to, $rootScope.$stateParams)

    $scope.appRoot = {}
    $scope.appRoot.localKeyboardInput = false




    $scope.appRoot.addNew = ->
      IDService.getNextID()
      .then (id) ->
        transitionState($state.current.name, id)
      , (err) ->
        transitionState($state.current.name, undefined)


    $scope.cleanup = ->
      confirmCleanup = $window.confirm("Are you sure ?")
      if(confirmCleanup)
        AppService.cleanup()

    synonymsMetadata = {}
    $scope.person = {}
    $scope.metadata = {}

    init = ->
      loadSynonyms = (data)->
        synonymArray = []
        data.forEach (obj)->
          synonymArray = synonymArray.concat(obj.synonyms)
        $scope.metadata.synonyms = synonymArray


      $http.get('assets/metadata/diseaseSynonyms.json')
      .success (data)->
        synonymsMetadata = data
        loadSynonyms(data)

      $http.get('assets/metadata/ageGroups.json')
      .success (data)->
        $scope.metadata.ageGroups = data


    $scope.handleCauseOfDeath = (cod)->
      deathId = $rootScope.$stateParams['deathId']
      AppService.postData('respondentcod', {deathId: deathId, summary: cod})
      .then -> $log.info('saved respondent cod')
      $scope.person.disease = undefined
      synonymsMetadata.forEach (obj)->
        if(_.contains(obj.synonyms, cod))
          $scope.person.disease = obj.disease

      $scope.person.disease = $scope.person.disease || "others"
      $state.go('enum.eslDetail.birthDetails', $stateParams)


    $scope.changeLanguage = (lang)->
      $rootScope.lang = if(lang != '') then "_" + lang else lang
      path = if(lang == 'en') then "" else lang + "/"
      #Schemas already loaded during appRun
      cacheSchemas = (schemaNames, schemas)->
        _.each(schemaNames, (schemaName, index)->
          SchemaFactory.put(schemaName.replace('.json', ''), schemas[index])
        )

      loadSchemas = (schemaNames)->
        SchemaLoader.loadAllSchemas(schemaNames, 'assets/jsonSchema/' + path)
        .then (schemas)->
          cacheSchemas(schemaNames, schemas)
      JsonSchemaListService.getSchemaList('mvm')
      .then (schemaNames) -> loadSchemas(schemaNames)


    init()
    $scope.changeLanguage('gj')

    #VA module
    $scope.steps = [
      {label: 'Summary'},
      {label: 'Positive Symptoms'}
      {label: 'Probing Symptoms'}
      {label: 'Medical Inf'}
      {label: 'Narrative'}
    ]
    $rootScope.getSymptomList = (domain) ->
      cacheBurst = new Date().getTime()
      console.log('loading ' + domain + ' symptom list')
      $http.get('assets/symptoms/' + domain + '.json?' + cacheBurst)
      .success (data)->
        $scope.symptomList = data
        $scope.symptomList.forEach (e)->
          e.active = false

    flushVAData = ->
      $scope.participant = {
        respondentCOD: '',
        medicalInformation: ''
      }
      $scope.probing = {}
      $scope.positiveSymptoms = []
      $scope.negativeSymptoms = []
      $scope.sortedSymptoms = []
    #getSymptomList()

    flushVAData()


    #getSymptomList()

    $scope.selectSymptom = (symptom)->
      symptom.active = !symptom.active
      $scope.positiveSymptoms = _.filter($scope.symptomList, (e)-> e.active)

    $scope.filterSymptoms = ->
      $scope.positiveSymptoms = _.filter($scope.symptomList, (e)-> e.active)
      $scope.negativeSymptoms = _.filter($scope.symptomList, (e)-> !e.active)

    $scope.sortedSymptoms = []

    $scope.clearSymptomOrdering = ->
      $scope.positiveSymptoms = _.filter($scope.symptomList, (e)-> e.active)
      $scope.negativeSymptoms = _.filter($scope.symptomList, (e)-> !e.active)
      $scope.sortedSymptoms = []


    $scope.extractSymptom = (symptom)->
      $scope.sortedSymptoms.push(symptom)
      $scope.positiveSymptoms = _.remove($scope.positiveSymptoms,
        (obj)-> obj.name != symptom.name)

    $scope.step1Complete = ->
#      _.forEach $scope.symptomList, (symptom)->
#        if($scope.participant.respondentCOD.indexOf(symptom.name) != -1)
#          symptom.active = true
      $state.go('steps.step2')


    $scope.readNotes = ->
      Audio.stop($rootScope.$stateParams['deathId'], 'summary')
      modalInstance = $modal.open({
        templateUrl: 'tpls/summary.jade',
        controller: 'ModalInstanceCtrl'
      })

    $scope.saveVA = ->
      if($scope.participant.narrative.length < 124)
        alert('Narrative is very short')
        return
      deathId = $rootScope.$stateParams['deathId']
      prm = (entity, data)->
        AppService.postData(entity, data)

      filteredSymptoms = []
      $scope.positiveSymptoms.forEach (symptom)->
        obj = {name: symptom.name, probe: []}
        symptom.properties.forEach (probe)->
          obj.probe.push({
            name: probe.name,
            comment: probe.comment,
            comments: probe.comments
          })
        filteredSymptoms.push(obj)


      #For Surveyors
      promises = [prm('respondentcod',
        {deathId: deathId, summary: $scope.participant.respondentCOD}),
                  prm('medicalinfo',
                    {
                      deathId: deathId,
                      summary: $scope.participant.medicalInformation
                    }),
                  prm('narrative',
                    {
                      deathId: deathId,
                      summary: $scope.participant.narrative
                    }),
                  prm('positiveSymptoms',
                    {
                      deathId: deathId,
                      summary: JSON.stringify(filteredSymptoms)
                    })]
      #      #For Physicians
      #      promises = [prm('respondentcodPhysician',
      #        {deathId: deathId, summary: $scope.participant.respondentCOD}),
      #                  prm('medicalinfoPhysician',
      #                    {
      #                      deathId: deathId,
      #                      summary: $scope.participant.medicalInformation
      #                    }),
      #                  prm('narrativePhysician',
      #                    {
      #                      deathId: deathId,
      #                      summary: $scope.participant.narrative,
      #                      surveyor: $rootScope.user.id
      #                    }),
      #                  prm('positiveSymptomsPhysician',
      #                    {
      #                      deathId: deathId,
      #                      summary: JSON.stringify(filteredSymptoms)
      #                    })]

      $q.all(promises)
      .then ->
        toaster.pop('success', '', 'Saved Successfully')

        flushVAData()
        AppService.getData('death', deathId)
        .then((data)->
          console.log(data)
          $stateParams['houseId'] = data['houseId']
          $stateParams['householdId'] = data['householdId']
          console.log('keyboar flasg')
          console.log($scope.appRoot.localKeyboardInput)
          if($scope.appRoot.localKeyboardInput == true)
            Lang.switch()
            $scope.appRoot.localKeyboardInput = false

          $state.go('enum.householdDetail.esl', $stateParams)
        )

  #$state.go('va.areaDetail.death', $rootScope.$stateParams)


  app.controller 'ModalInstanceCtrl', ($scope, $modalInstance,
                                       AppService, $rootScope)->
    $scope.ok = (respCooperation)->
      AppService.postData('feedback',
        #AppService.postData('feedbackPhysician',
        {
          deathId: $rootScope.$stateParams['deathId'],
          cooperation: respCooperation,
          surveytype: 'va',
          surveyor: $rootScope.user.id,
        })
      $modalInstance.close()


  app.filter 'sentencecase', ->
    (str)->
      str.substr(0, 1).toUpperCase() + str.substr(1, str.length)



















