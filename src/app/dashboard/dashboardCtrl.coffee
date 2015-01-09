do (app = angular.module('myApp.dashboard')) ->


  app.controller 'DashboardCtrl', (ChartService, $interval) ->

    vm = this
    chartType = 'bar'
    pendingDownloadsConfig = getChartConfig('Pending Downloads')

    getChartConfig = (title) ->
      labels: false
      title: title
      legend: {display: true, position: "right"}
      innerRadius: 0,
      lineLegend: "lineEnd"

    $interval (-> updateDashboard()),200

    updateDashboard = () ->
      ChartService.getPendingDownloads()
      .then (data)-> vm.pendingDowloads = data


    isEquals = (json1, json2) ->
      JSON.stringify(json1) == JSON.stringify(json2)
