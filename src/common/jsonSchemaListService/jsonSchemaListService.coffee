do(app = angular.module 'myApp.jsonSchemaListService', []) ->


  app.factory 'JsonSchemaListService', ($http, $window, $log) ->

    getEnv = -> if (/7000/.test($window.location.href)) then 'dev' else 'prod'
    resolveAppName = (env,appName) -> if(env=='dev') then appName else ''

    getServiceUrl = (appName) ->
      env = getEnv()
      "api/survey/jsonSchemaList/#{env}/" + resolveAppName(env,appName)


    getSchemaList: (appName) ->
      serviceUrl = getServiceUrl(appName)
      $http.get(serviceUrl)
      .then ((resp)-> resp.data), (-> $log.error('Failed to load json schema'))



