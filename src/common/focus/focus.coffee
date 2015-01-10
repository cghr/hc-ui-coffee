do(app = angular.module 'myApp.focus', []) ->


  app.directive 'focus', ($timeout) ->

    postLink = (scope, element)->

      watchFn = (value) ->
        focusElement = -> element[0].focus()
        if(value == 'true')
          $timeout(focusElement, 0)

      scope.$watch('trigger', watchFn)



    {
    scope: {trigger: '@focus'}
    link: postLink
    }

