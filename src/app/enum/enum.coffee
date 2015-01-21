do(app = angular.module('enum', ['ui.router',
                                 'myApp.routeConfigHandler',
                                 'enumRoutes', 'myApp.dataGrid'])) ->


  app.config ($stateProvider, enumRoutes, RouteConfigHandler) ->

    $stateProvider.state(enumRoutes.name, {
      url: enumRoutes.url,
      templateUrl: enumRoutes.tpl
    })

    RouteConfigHandler
    .configRoutesForChildren($stateProvider,
      enumRoutes.name, enumRoutes.children)



