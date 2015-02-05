do(app = angular.module('ngcamera', ['ui.bootstrap', 'omr.directives',
                                     'toaster', 'dataUrltoBlob',
                                     'fileUploadService', 'myApp.lodash',
                                     'ui.router'])) ->
  app.config ($stateProvider)->
    url1 = "/hc/area/:areaId/house/:houseId/household/:householdId/"
    url2 = 'member/:memberId/cam/:category/:imgSuffix'
    $stateProvider.state('cam', {
      url: url1 + url2,
      templateUrl: 'ngcamera/ngcamera.html'
    })


  app.controller 'camCtrl', ($scope, $stateParams,
                             toaster, $http,
                             DataUrlToBlob, FileUploadService, _)->
    closeDialog = -> $scope.$close()
    $scope.ok = closeDialog
    $scope.cancel = closeDialog


    $scope.$watch 'media', (media)->
      if(media == undefined )
        return
      file = DataUrlToBlob.convert(media)
      fd = new FormData()

      reqData = {
        category: $stateParams.category,
        filename: $stateParams.memberId + '_' + $stateParams.imgSuffix,
        memberId: $stateParams.memberId
      }

      reqData[$stateParams.imgSuffix] =
        $stateParams.memberId + '_' + $stateParams.imgSuffix
      fd.append("data", JSON.stringify(reqData))
      fd.append("file", file)

      FileUploadService.upload(fd, 'memberImage')
