do(app = angular.module('enum', ['ui.router',
                                 'myApp.routeConfigHandler',
                                 'enumRoutes', 'myApp.dataGrid'])) ->


  app.config ($stateProvider, enumRoutes, RouteConfigHandler) ->

    $stateProvider.stat(enumRoutes.name, {
      url: enumRoutes.url,
      templateUrl: enumRoutes.tpl
    })

    RouteConfigHandler
    .configureRoutesForChildren($stateProvider,
      enumRoutes.name, enumRoutes.children)



