do(app = angular.module('myApp.resolver',
  ['myApp.appService', 'ui.router', 'langToggle'])) ->
  app.config ($stateProvider)->
    $stateProvider.state('resolver', {
      url: '/enum/area/:areaId/house/:houseId' +
        '/household/:householdId/resolver/:deathId',
      templateUrl: 'resolver/resolver.jade',
      controller: 'resolverCtrl'
    })


  app.controller 'resolverCtrl', ($scope, $http, $stateParams,
                                  AppService, $state, Lang)->
    deathId = $stateParams['deathId']
    surveyType = undefined

    isMaternal = (age, age_unit, sex)->
      (sex == 'Female' && age_unit == 'Years' && age >= 15 && age < 50)
    isAdult = (age, age_unit)->
      (age_unit == 'Years' && age >= 15)
    isChild = (age, age_unit)->
      years=convertToYears(age,age_unit)
      years>0.079 && years<15

    isNeonate = (age, age_unit)->
      (age_unit == 'Days' && age < 30)

    $scope.enableLocalKeyboard = (flag)->
      $scope.appRoot.localKeyboardInput = flag
      Lang.switch()

    getNextState = (type, age, age_unit, sex)->
#      'steps.step1'
      if(type == 'esl')
        'enum.cod'
      else if(type == 'va')
        if(isAdult(age, age_unit)) then 'enum.vaDetail.adult'
        else if(isMaternal(age, age_unit, sex)) then 'enum.vaDetail.maternal'
        else if(isNeonate(age, age_unit)) then 'enum.vaDetail.neonate'
        else if(isChild(age,age_unit)) then 'enum.vaDetail.vaInjury'
        else 'steps.step1'


    AppService.getData('death', deathId)
    .then (data)->
      $scope.subject = data
      nextState =
        getNextState(data.surveytype, data.age_value, data.age_unit, data.sex)
      $scope.proceed = ->
        $state.go(nextState, $stateParams)

    convertToYears = (ageValue, ageUnit) ->
      switch ageUnit
        when "Days"
          return ageValue / 365
        when "Months"
          return (ageValue * 30) / 365
        when "Years"
          return ageValue



