(function (app) {
    app.controller('EslCtrl', function ($scope, $state, $rootScope, AppService, $stateParams, toaster) {

        var deathId = $stateParams.deathId
        var deathDetails = {}

        $scope.eslConfigChildren = [{"label": "Birth Details", "name": "birthDetails", "range": "0-5.01"}, {
            "label": "Immunization",
            "name": "immunization",
            "range": "0-15"
        }, {"label": "Illness/Skin", "name": "illnessSkin", "range": "0-100"}, {
            "label": "Fever",
            "name": "fever",
            "range": "0-100"
        }, {"label": "Breathing Problems", "name": "breathing", "range": "0-100"}, {
            "label": "Chest Pain",
            "name": "chestPain",
            "range": "1-100"
        }, {"label": "Diarrhoea", "name": "diarrhoeaVomit", "range": "0-100"}, {
            "label": "Abdominal Problems",
            "name": "abdominalUrine",
            "range": "0-100"
        }, {"label": "Consciousness", "name": "consciousness", "range": "0-100"}, {
            "label": "Paralysis",
            "name": "paralysis",
            "range": "5-100"
        }, {"label": "Weight", "name": "weight", "range": "1-100"}, {
            "label": "Injury",
            "name": "injury",
            "range": "0-100"
        }, {"label": "Pregnancy", "name": "pregnancy", "range": "12-49", "sex": "Female"}, {
            "label": "Medical History",
            "name": "medicalHistory",
            "range": "1-100"
        }, {"label": "Health Care", "name": "healthcare", "range": "0-100"}, {
            "label": "Tobacco",
            "name": "tobacco",
            "range": "5-100"
        }, {"label": "Feedback", "name": "feedback", "range": "0-100"}];

        $scope.eslConfig = {
            name: 'eslDetail',
            url: '/area/:areaId/house/:houseId/household/:householdId/esl/:deathId',
            tpl: 'enum/esl/esl.html',
            title: '',
            prevState: {name: 'enum.householdDetail.esl', title: 'ESL'},
            children: []
        };

        AppService.getData('death', deathId).then(function (data) {

            deathDetails = data

            deathDetails.age = convertToYears(deathDetails.age_value, deathDetails.age_unit)
            //$scope.eslConfig.children = getEligibleSections(deathDetails.age);

            var sectionPattern = getSectionPattern(getAgeGroup(deathDetails.age))
            var sections = sectionPattern.split(",")
            sections.forEach(function (section) {

                $scope.eslConfig.children.push($scope.eslConfigChildren[parseFloat(section - 1)])
            })

            if (deathDetails.sex == 'Male' || (deathDetails.sex == 'Female' && deathDetails.age < 12)) {
                _.remove($scope.eslConfig.children, function (child) {
                    return child.name == 'pregnancy'

                })
            }

            $state.go('enum.eslDetail.' + ($scope.eslConfig.children[0]).name, $stateParams)
        })

        $scope.handleEslNav = function (data) {


            var currentSection = _.findIndex($scope.eslConfig.children, function (child) {

                return ($state.current.name == 'enum.eslDetail.' + child.name)
            })
            var nextSection = $scope.eslConfig.children[currentSection + 1]
            var nextState = (nextSection) ? 'enum.eslDetail.' + nextSection.name : 'enum.householdDetail.esl'
            $state.go(nextState, $stateParams);
            if (nextState == 'enum.householdDetail.esl'){
                toaster.pop('success', '', 'Saved Successfully')
            }



        }

        //Todo replace with new Section def


        function getEligibleSections(deathAge) {

            return _.filter($scope.eslConfigChildren, function (child) {

                var range = child.range.split("-");
                return deathAge > parseFloat(range[0]) && deathAge < parseFloat(range[1])

            })
        }

        function convertToYears(ageValue, ageUnit) {

            switch (ageUnit) {

                case 'Days':
                    return ageValue / 365
                    break
                case 'Months':
                    return (ageValue * 30) / 365
                    break;
                case 'Years':
                    return ageValue
                    break;

            }

        }

        function getAgeGroup(age) {

            var ageGroups = [
                {name: 'neonatal', range: '0-0.077'},
                {name: 'child1', range: '0.077-1'},
                {name: 'child2', range: '1-5.01'},
                {name: 'child3', range: '5-15'},
                {name: 'adult', range: '15-100'}
            ];

            var result = _.find(ageGroups, function (obj) {

                var range = obj.range.split("-")
                return age >= parseFloat(range[0]) && age < parseFloat(range[1])
            })
            return result.name;

        }

        function getSectionPattern(ageGroupName) {


            var ageGroupObj = _.find($scope.metadata.ageGroups, function (obj) {

                return obj.name == ageGroupName;
            })

            function getDiseaseObj(disease) {

                return _.find(ageGroupObj.diseases, function (obj) {
                    return disease == obj.name;
                })
            }

            var diseaseObj = getDiseaseObj($scope.person.disease) || getDiseaseObj('others')
            //Last section feedback
            return (ageGroupObj.first ? (ageGroupObj.first + ",") : "") + (diseaseObj.pattern) + "," + ageGroupObj.last + ",17"

        }


    })

})(angular.module('esl', ['ui.router', 'myApp.appService', 'toaster']));
