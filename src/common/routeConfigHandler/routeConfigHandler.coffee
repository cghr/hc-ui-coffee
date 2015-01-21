do(app = angular.module 'myApp.routeConfigHandler', []) ->
  app.constant('RouteConfigHandler',

    configRoutesForChildren: ($stateProvider, parentState, children) ->
      self = this
      angular.forEach(children, (child)->

        getChildrenData = (child) ->
          if(child.children)
            self.getData(child, children, parentState)
          else
            {}

        getAbstractState = (child)->
          child.children?.length > 0

        childrenData = getChildrenData(child)
        abstract = getAbstractState(child)

        $stateProvider.state(parentState + '.' + child.name, {
          url: child.url,
          templateUrl: child.tpl,
          title: child.title,
          addNew: child.addNew,
          msg: child.msg,
          data: childrenData,
          abstract: abstract

        })

        if(child.children)
          self.configRoutesForChildren(
            $stateProvider, parentState + '.' + child.name, child.children)
      )

    getData: (object, array, parentState) ->
      prevObject = object.prevState
      data = {
        prev: prevObject,
        children: object.children,
        thisState: {
          name: parentState + '.' + object.name,
          title: object.title,
          addNew: object.addNew
        }
      }
      return data
  )