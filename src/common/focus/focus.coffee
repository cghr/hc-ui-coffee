do(app = angular.module 'myApp.focus', []) ->

  app.directive 'focus', ($timeout)->

    postLink = (scope, element)->

      scope.$watch('trigger', (value)->
        focusElement= -> element[0].focus()
        if(value == 'true')
          $timeout(focusElement,0)
      )

    {
    scope: {trigger: '@focus'}
    link: postLink
    }

