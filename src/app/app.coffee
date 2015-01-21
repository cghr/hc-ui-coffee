do (app = angular.module "myApp", [
  'security'
  'myApp.dashboard'
  'myApp.stateTransitions'
  'myApp.report'
  'myApp.sync'
  'enum'
  'hc'
  'myApp.appService'
  'myApp.idService'
  'myApp.home'
  'myApp.jsonSchemaListService'
  'myApp.schemaLoader'
  'templates-app'
  'templates-common'
  'ui.router.state'
  'ui.router'
  'anguFixedHeaderTable'
  'cgForm'
]) ->


  app.config ($stateProvider, $urlRouterProvider, $httpProvider) ->

    $urlRouterProvider.otherwise '/enum/area'

    isDevEnv = -> /900*/.test(window.location.href)

    isRESTRequest = (url) -> /api*/.test(url)

    reqConfig = (config) ->
      if(isRESTRequest(config.url))
        config.url = 'http://localhost:8080/services/' + config.url
      return config

    reqInterceptor = -> {request: reqConfig}

    if isDevEnv()
      $httpProvider.interceptors.push(reqInterceptor)









