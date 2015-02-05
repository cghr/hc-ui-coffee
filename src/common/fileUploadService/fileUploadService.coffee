do(app = angular.module('fileUploadService', ['toaster'])) ->


  app.factory 'FileUploadService', ($http, toaster) ->

    url = "api/fileEntity/"
    config = {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }


    upload: (formData, entity)->
      $http.post(url + entity, formData, config)
      .success ->
        console.log('success')
        toaster.pop 'success', '', 'Uploaded Successfully'
      .error ->
        toaster.pop 'error', '', 'Error while uploading'

