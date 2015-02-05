do (app = angular.module('photoConsent', ['ui.bootstrap'])) ->


  app.controller 'PhotoConsentCtrl', ($scope, $modal,
                                      $stateParams, AppService) ->
    vm = $scope
    vm.memberImage = {}
    vm.photoCaptures = [
      {type: 'photo', msg: 'Member Photo'},
      {type: 'consent', msg: 'Consent'}
    ]

    getStateParam = (category) ->
      if(category == 'consent') then 'memberConsent'
      else 'memberPhoto'

    updateCaptureStatus= ->
      AppService.getData('memberImage',$stateParams.memberId)
      .then (data)-> vm.memberImage=data

    openDialog = (category) ->

      $stateParams.imgSuffix = category
      $stateParams.category = getStateParam(category)

      modalInstance=$modal.open({
        templateUrl:'ngcamera/ngcamera.jade',
        controller:'camCtrl',
        size:'lg'
      })
      modalInstance.result
      .then -> updateCaptureStatus()

    vm.open = openDialog
    updateCaptureStatus()