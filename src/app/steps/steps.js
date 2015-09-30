(function (app) {

    app.config(function ($stateProvider) {

        //$stateProvider.state('steps', {
        //    url: '/enum/area/:areaId/house/:houseId/household/:householdId/va/:deathId/steps',
        //    templateUrl: 'steps/steps.html'
        //})
        //
        //
        //for (var i = 1; i < 6; i++) {
        //
        //    $stateProvider.state("steps.step" + i, {
        //        url: "/step" + i,
        //        templateUrl: "steps/step" + i + ".html"
        //    })
        //}
        $stateProvider.state('steps', {
            url: '/va/area/:areaId/vaDeath/:deathId/steps',
            templateUrl: 'steps/steps.html'
        })


        for (var i = 1; i < 6; i++) {

            $stateProvider.state("steps.step" + i, {
                url: "/step" + i,
                templateUrl: "steps/step" + i + ".html"
            })
        }


    });
    app.controller('VACtrl', function ($http, $log, $stateParams, AppService,$rootScope) {

        AppService.getData('death', $stateParams['deathId'])
            .then(function (data) {
                $rootScope.domain = (data['age_unit'] == 'Years' && data['age_value'] >= 15) ? 'adult' : 'child'
                console.log('domain '+$rootScope.domain)
                $rootScope.getSymptomList($rootScope.domain)
            });


    })


})(angular.module('steps', ['ui.router', 'checklist-model']));

