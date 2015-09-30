do (app = angular.module "myApp", [

  'resampling'
  'va'
  'myApp.restore'
  'base64'
  'myApp.areaResolver'
  'myApp.resolver'
  'myApp.lodash'
  'myApp.appService'
  'myApp.idService'
  'myApp.jsonSchemaListService'
  'myApp.schemaLoader'
  'myApp.focus'
  'myApp.stateTransitions'
  'myApp.report'
  'myApp.backSpaceNav'
  'angular-loading-bar'
  'dashboard'
  'esl'
  'sync'
  'enum'
  'templates-app'
  'templates-common'
  'ui.router.state'
  'ui.router'
  'anguFixedHeaderTable'
  'cgForm'
  'security'
  'steps'
  'audioService'
  'langToggle'
]) ->
  app.config ($stateProvider, $urlRouterProvider, $httpProvider) ->
    $urlRouterProvider.otherwise '/enum/area'

    isDevEnv = -> /7000/.test(window.location.href)

    isRESTRequest = (url) -> /api*/.test(url)

    reqConfig = (config) ->
      if(isRESTRequest(config.url))
        config.url = 'http://localhost:8080/services/' + config.url
      return config

    reqInterceptor = -> {request: reqConfig}

    if isDevEnv()
      $httpProvider.interceptors.push(reqInterceptor)












