do(app = angular.module 'myApp.jsonSchemaListService', []) ->


  app.factory 'JsonSchemaListService', ($http, $window, $log) ->

    getEnv = -> if (/900*/.test($window.location.href)) then 'dev' else 'prod'

    getServiceUrl = (appName)->
      env = getEnv()
      "api/JsonSchemaService/#{env}/" + if (env == 'dev') then appName else ''



    getSchemaList: (appName) ->
      serviceUrl = getServiceUrl(appName)
      $http.get(serviceUrl)
      .success (data) -> return data
      .error ()-> $log.error 'Failed to get json schema list'



