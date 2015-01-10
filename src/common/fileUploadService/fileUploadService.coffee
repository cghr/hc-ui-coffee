do(app = angular.module('myApp.fileUploadService', ['toaster'])) ->


  app.factory 'FileUploadService', ($http, toaster) ->

    url = "api/file/fileStoreService"
    config = {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }



    upload: (formData)->
      $http.post(url, formData, config)
      .success -> toaster.pop 'success', '', 'Uploaded Successfully'
      .error -> toaster.pop 'error', '', 'Error while uploading'

