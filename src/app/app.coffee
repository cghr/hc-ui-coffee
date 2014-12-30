do (app = angular.module "myApp", [
  'myApp.appService',
  'myApp.idService',
  'myApp.home',
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.router',
  'anguFixedHeaderTable'
]) ->
  app.config ($stateProvider, $urlRouterProvider, $httpProvider) ->

    isRESTRequest=(url) ->  "api/".test(url)
    isDevEnv= ->  /900*/.test(window.location.href)

    reqConfig = (config) ->
      if(isRESTRequest(config.url))
        config.url = 'http://localhost:8080/services/' + config.url
      return config

    reqInterceptor = {request: reqConfig}

    if(isDevEnv())
      $httpProvider.interceptors.push(reqInterceptor)


    $urlRouterProvider.otherwise '/home'







