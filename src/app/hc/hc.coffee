do(app = angular.module('hc', ['ui.router',
                               'myApp.routeConfigHandler',
                               'hcRoutes'])) ->


  app.config ($stateProvider, hcRoutes, RouteConfigHandler) ->

    $stateProvider.state(hcRoutes.name, {
      url: hcRoutes.url,
      templateUrl: hcRoutes.tpl
    })

    RouteConfigHandler
    .configRoutesForChildren($stateProvider,hcRoutes.name, hcRoutes.children)



