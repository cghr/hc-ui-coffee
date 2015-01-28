do(app = angular.module 'myApp.jsonSchemaListService', []) ->


  app.factory 'JsonSchemaListService', ($http, $window, $log) ->

    getEnv = -> if (/900*/.test($window.location.href)) then 'dev' else 'prod'

    getServiceUrl = (appName) ->
      env = getEnv()
      "api/survey/jsonSchemaList/#{env}/" + if (env == 'dev') then appName else ''


    getSchemaList: (appName) ->
      serviceUrl = getServiceUrl(appName)
      $http.get(serviceUrl)
      .then ((resp)->  resp.data),(-> $log.error('Failed to load json schema'))



