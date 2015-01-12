do(app = angular.module('hc', ['ui.router',
                               'myApp.routeConfigHandler',
                               'hcRoutes'])) ->


  app.config ($stateProvider, hcRoutes, RouteConfigHandler) ->

    $stateProvider.stat(hcRoutes.name, {
      url: hcRoutes.url,
      templateUrl: hcRoutes.tpl
    })

    RouteConfigHandler
    .configureRoutesForChildren($stateProvider,hcRoutes.name, hcRoutes.children)



