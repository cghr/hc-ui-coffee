do(app = angular.module 'myApp.jsonSchemaListService', []) ->

  app.factory 'JsonSchemaListService', ($http, $window, $log) ->

    getEnv = -> (/900*/.test($window.location.href)) ? 'dev': 'prod'
    getServiceUrl = (appName)->
      env = getEnv()
      "api/JsonSchemaService/#{env}/" + (env == 'dev' ? appName: '')

    {
    getSchemaList: (appName) ->
      serviceUrl = getServiceUrl(appName)
      $http.get(serviceUrl)
      .success (data) -> return data
      .error ()-> $log.error 'Failed to get json schema list'
    }


