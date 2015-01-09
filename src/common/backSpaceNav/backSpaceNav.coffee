do (app = angular.module('myApp.backSpaceNav', ['jQuery'])) ->


  app.directive 'keypressEvents', ($document, jQuery) ->


    postLink = () ->

      $document.bind 'keypress', (e)->
        target = jQuery(e.target || e.srcElement)
        targetType = (target) ->
          !target.is('input:text,input:password,textarea')
        if (e.keyCode == 8 && targetType() )
          e.preventDefault()


    {
    restrict: 'A',
    link: postLink
    }
