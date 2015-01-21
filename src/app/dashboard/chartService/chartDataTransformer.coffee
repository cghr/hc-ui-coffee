do (app = angular.module('chartDataTransformer', ['myApp.lodash'])) ->


  app.factory 'ChartDataTransformer', (_) ->

    filterFirstElm = (keys) ->
      keys.filter((elm, index) -> index != 0)

    getKeys = (json) ->
      _.keys(json)

    transformData = (jsonArray) ->
      jsonArray
      .map (obj) -> _.values(obj)
      .map (values) -> {x: values[0], y: filterFirstElm(values)}


    transform: (jsonArray) ->
      keys = getKeys(jsonArray[0])
      {
      series: filterFirstElm(keys),
      data: transformData(jsonArray)
      }






