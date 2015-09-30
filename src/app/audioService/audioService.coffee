do (app = angular.module('audioService', []))->
  app.factory('Audio', ($http)->
    log = (msg)-> console.log(msg)

    stop: (deathId, context)->
      $http.get('api/audio/stop/' + context + '/' + deathId).then(
        -> log('Audio recording stopped')
      )
    start: (context, deathId)->
      $http.get("api/audio/start/#{context}/#{deathId}").then(
        -> log('Audio recording started')
      )
  )