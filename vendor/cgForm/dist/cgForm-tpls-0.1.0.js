/*
 * cgForm
 * 

 * Version: 0.1.0 - 2015-01-22
 * License: MIT
 */
angular.module('cgForm', [
    'cgForm.tpls',
    'cgForm.lodash',
    'cgForm.formConfig',
    'cgForm.templateFactory',
    'cgForm.initFocus',
    'cgForm.jQuery',
    'cgForm.scrollTop',
    'cgForm.ngEnter',
    'cgForm.myFocus',
    'cgForm.formElement',
    'cgForm.formService',
    'cgForm.joelpurra',
    'cgForm.schemaFactory',
    'cgForm.schemaResolver',
    'cgForm.standardForm',
    'cgForm.timelog',
    'cgForm.surveyForm',
    'cgForm.tableForm'
]);
angular.module('cgForm.tpls', [
    'template/formElement/checkbox.html',
    'template/formElement/control-group-heading.html',
    'template/formElement/control-group.html',
    'template/formElement/dropdown.html',
    'template/formElement/dynamic_dropdown.html',
    'template/formElement/gps.html',
    'template/formElement/hidden.html',
    'template/formElement/label-heading.html',
    'template/formElement/label.html',
    'template/formElement/lookup.html',
    'template/formElement/password.html',
    'template/formElement/radio-inline.html',
    'template/formElement/radio.html',
    'template/formElement/readonly.html',
    'template/formElement/select_singletext.html',
    'template/formElement/select_text.html',
    'template/formElement/suggest.html',
    'template/formElement/text.html',
    'template/formElement/text_select.html',
    'template/formElement/textarea.html',
    'template/standardForm/standardForm.html',
    'template/surveyForm/surveyForm.html'
]);
angular.module('cgForm.lodash', []).constant('_', window._);
angular.module('cgForm.formConfig', ['cgForm.lodash']).factory('FormConfig', function () {
    return {
        submitUrl: 'api/entity/',
        resourceBaseUrl: 'api/entity/',
        lookupBaseUrl: 'api/LookupService/',
        crossFlowBaseUrl: 'api/CrossFlowService',
        crossCheckBaseUrl: 'api/CrossCheckService',
        dynamicDropdownBaseUrl: 'api/dynamicDropdownService',
        gpsServiceUrl: 'api/gps',
        submitLabel: 'Save',
        style: 'well'
    };
});
angular.module('cgForm.templateFactory', []).factory('TemplateFactory', [
    '$http',
    '$templateCache',
    function TemplateFactory($http, $templateCache) {
        function getTemplate(templateName) {
            var template = 'template/formElement/' + templateName + '.html';
            return $http.get(template, { cache: $templateCache });
        }
        return { get: getTemplate };
    }
]);
angular.module('cgForm.initFocus', []).directive('initFocus', [
    '$timeout',
    function ($timeout) {
        function postLink(scope, elm, attrs) {
            if (attrs.initFocus === 'false')
                return;
            function elmFocus() {
                elm.focus();
            }
            $timeout(elmFocus, 0);
        }
        return {
            restrict: 'A',
            link: postLink
        };
    }
]);
;
angular.module('cgForm.jQuery', []).constant('jQuery', window.jQuery);
angular.module('cgForm.scrollTop', ['cgForm.jQuery']).directive('scrollTop', [
    '$timeout',
    'jQuery',
    function ($timeout, jQuery) {
        function postLink(scope, elm, attrs) {
            if (attrs.scrollTop == 'false')
                return false;
            function scrollTop() {
                jQuery('body, html').animate({ scrollTop: jQuery(elm).offset().top }, 100);
            }
            /* Scroll to the newly added element */
            $timeout(scrollTop, 0);
        }
        return { link: postLink };
    }
]);
angular.module('cgForm.ngEnter', []).directive('ngEnter', function () {
    function postLink(scope, elem, attrs) {
        elem.bind('keypress', function (e) {
            if (e.charCode === 13 && !e.shiftKey)
                scope.$apply(attrs.ngEnter);
        });
    }
    return {
        restrict: 'A',
        link: postLink
    };
});
angular.module('cgForm.myFocus', []).directive('myFocus', function () {
    return {
        link: function postLink(scope, elem, attrs) {
            elem.bind('focus', function (e) {
                scope.$apply(attrs.myFocus);
            });
        }
    };
});
angular.module('cgForm.formElement', [
    'cgForm.templateFactory',
    'cgForm.initFocus',
    'cgForm.scrollTop',
    'cgForm.ngEnter',
    'cgForm.myFocus'
]).directive('formElement', [
    '$http',
    '$compile',
    '$templateCache',
    'TemplateFactory',
    function ($http, $compile, $templateCache, TemplateFactory) {
        function postLink(scope, element, attrs) {
            /* Evaluate data supplied in attrs */
            scope.config = scope.$eval(attrs.config);
            attrs.$observe('config', function () {
                scope.config = scope.$eval(attrs.config);
            });
            /* Create a templateUrl from config.type */
            var isHeading = scope.config.type === 'heading';
            var controlGroup = isHeading ? 'label-heading' : 'label';
            /* Get the control group template first and insert the input widget template */
            TemplateFactory.get(controlGroup).then(function (response) {
                element.html(response.data);
                $compile(element)(scope);
                if (isHeading)
                    return;
                TemplateFactory.get(scope.config.type).then(function (response) {
                    element.find('div.controls').html(response.data);
                    $compile(element)(scope);
                });
            });
        }
        return {
            replace: true,
            restrict: 'E',
            template: '<div></div>',
            scope: true,
            link: postLink
        };
    }
]);
angular.module('cgForm.formService', [
    'cgForm.formConfig',
    'cgForm.lodash',
    'ui.router'
]).factory('FormService', [
    'FormConfig',
    '$http',
    '$location',
    '_',
    '$stateParams',
    '$log',
    function (FormConfig, $http, $location, _, $stateParams, $log) {
        return {
            getResource: getResource,
            postResource: postResource,
            getLookupData: getLookupData,
            getCrossCheckData: getCrossCheckData,
            checkCrossFlow: checkCrossFlow,
            getDynamicDropdownData: getDynamicDropDownData,
            getGPS: getGPS
        };
        function getGPS() {
            return $http.get(FormConfig.gpsServiceUrl).success(function (resp) {
                var gps = resp.data;
                if (gps.latitude === 0 || gps.longitude === 0)
                    alert('GPS Not Fixed.Check whether the device is inserted properly and device light is blinking and Try Again');
                else
                    return gps;
            }).error(function () {
                alert('GPS Server not Running');
            });
        }
        function postData(url, data) {
            return $http.post(url, data);
        }
        function getData(url) {
            return $http.get(url);
        }
        function getResource(entity) {
            var params = $location.url().split('/');
            var entityId = params[params.length - 2];
            var dataUrl = FormConfig.resourceBaseUrl + entity + '/' + entityId;
            return getData(dataUrl);
        }
        function postResource(data) {
            var entityName = data.datastore;
            delete data.datastore;
            return postData(FormConfig.submitUrl + entityName, data);
        }
        function getLookupData(reqData) {
            reqData.refId = $stateParams[reqData.ref];
            return postData(FormConfig.lookupBaseUrl, reqData);
        }
        function getCrossCheckData(reqData) {
            reqData.refId = $stateParams[reqData.ref];
            return postData(FormConfig.crossCheckBaseUrl, reqData);
        }
        function checkCrossFlow(crossFlows) {
            angular.forEach(crossFlows, function (crossFlow) {
                crossFlow.refId = $stateParams[crossFlow.ref];
            });
            return postData(FormConfig.crossFlowBaseUrl, crossFlows);
        }
        function getDynamicDropDownData(reqData) {
            return postData(FormConfig.dynamicDropdownBaseUrl, reqData);
        }
    }
]);
angular.module('cgForm.joelpurra', []).factory('JoelPurra', [
    '$window',
    function ($window) {
        var JoelPurra = $window.JoelPurra;
        JoelPurra.PlusAsTab.setOptions({ key: 13 });
        return JoelPurra;
    }
]);
angular.module('cgForm.schemaFactory', ['cgForm.lodash']).factory('SchemaFactory', [
    '_',
    function (_) {
        return {
            get: getSchema,
            put: putSchema
        };
        function getSchema(schemaName) {
            if (_.isUndefined(this[schemaName]))
                throw 'Schema Not found for ' + schemaName;
            return this[schemaName];
        }
        function putSchema(schemaName, schemaObject) {
            this[schemaName] = schemaObject;
        }
    }
]);
angular.module('cgForm.schemaResolver', [
    'cgForm.schemaFactory',
    'cgForm.lodash',
    'ui.router',
    'cgForm.formConfig'
]).factory('SchemaResolver', [
    'SchemaFactory',
    '_',
    '$state',
    'FormConfig',
    function (SchemaFactory, _, $state, FormConfig) {
        function resolveSchema(scope) {
            /* Load Json Schema for current state if not supplied through attributes */
            var schema = _.clone(scope.options) || _.clone(SchemaFactory.get($state.current.name));
            /* Extend the current schema with default config */
            return _.extend(schema, FormConfig);
        }
        return { resolve: resolveSchema };
    }
]);
angular.module('cgForm.standardForm', [
    'cgForm.formElement',
    'cgForm.formConfig',
    'cgForm.formService',
    'cgForm.lodash',
    'ui.router',
    'cgForm.schemaFactory',
    'cgForm.joelpurra'
]).directive('standardForm', [
    'FormConfig',
    '_',
    'SchemaFactory',
    '$state',
    'FormService',
    '$rootScope',
    'JoelPurra',
    function (FormConfig, _, SchemaFactory, $state, FormService, $rootScope, JoelPurra) {
        return {
            templateUrl: 'template/standardForm/standardForm.html',
            restrict: 'E',
            replace: true,
            scope: {
                options: '=',
                randomtotal: '@',
                randomsize: '@',
                formdata: '='
            },
            link: function postLink(scope, element, attrs) {
                Date.prototype.today = function () {
                    return this.getFullYear() + '-' + (this.getMonth() + 1 < 10 ? '0' : '') + (this.getMonth() + 1) + '-' + (this.getDate() < 10 ? '0' : '') + this.getDate();
                };
                Date.prototype.timeNow = function () {
                    return (this.getHours() < 10 ? '0' : '') + this.getHours() + ':' + (this.getMinutes() < 10 ? '0' : '') + this.getMinutes() + ':' + (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
                };
                var newDate = new Date();
                $rootScope.timestamp = newDate.today() + ' ' + newDate.timeNow();
                /* Load Json Schema for current state if not supplied through attributes */
                scope.schema = angular.copy(scope.options) || angular.copy(SchemaFactory.get($state.current.name));
                /* Generates a random form */
                var randoms = [];
                var randomProperties = [];
                scope.randomsize = angular.isDefined(scope.randomsize) ? scope.randomsize : 0;
                for (var i = 0; i < scope.randomsize; i++) {
                    randoms.push(getRandomNumber());
                }
                if (scope.randomsize > 0 && scope.randomtotal > 0) {
                    /* Push all hidden properties */
                    angular.forEach(scope.schema.properties, function (property, index) {
                        if (property.type === 'hidden') {
                            randomProperties.push(property);  //scope.schema.properties.splice(index,1);
                        }
                    });
                    _.remove(scope.schema.properties, { type: 'hidden' });
                    angular.forEach(randoms, function (randomItem) {
                        randomProperties.push(scope.schema.properties[randomItem]);
                    });
                    scope.schema.properties = randomProperties;
                }
                function mathRandom() {
                    return Math.floor(Math.random() * scope.randomtotal + 1);
                }
                function getRandomNumber() {
                    var randomNumber;
                    while (1) {
                        randomNumber = mathRandom();
                        if (!_.contains(randoms, randomNumber)) {
                            break;
                        }
                    }
                    return randomNumber;
                }
                console.log('random properties');
                console.log(scope.schema.properties);
                /* Initialize data in  scope to save all form data*/
                scope.data = scope.formdata || {};
                /* Extend the current schema with default config */
                scope.schema = _.extend(scope.schema, FormConfig);
                /* Load lookup data if any and add initFocus attr to every elem to disable initFocus attribute */
                angular.forEach(scope.schema.properties, function (elem) {
                    elem.initFocus = false;
                    elem.scrollTop = false;
                    if (elem.type === 'lookup') {
                        FormService.getLookupData(elem.lookup).then(function (resp) {
                            elem.type = 'radio';
                            elem.items = resp.data;
                        });
                    }
                });
                /* Evaluate information in hidden fields */
                angular.forEach(scope.schema.properties, function (elem) {
                    if (elem.name !== 'datastore' && elem.type === 'hidden') {
                        elem.value = $rootScope.$eval(elem.value);
                    }
                    if (elem.type === 'hidden') {
                        scope.data[elem.name] = elem.value;
                    }
                });
                /* Initialize checkbox element's data with empty objects in scope.data */
                var multipleSelectElements = _.filter(scope.schema.properties, { type: 'checkbox' });
                _.each(multipleSelectElements, function (item) {
                    scope.data[item.name] = {};
                });
                /* Store datastore value in scope.data  */
                scope.data.datastore = _.find(scope.schema.properties, { name: 'datastore' }).value;
                /* Bind Enter as Tab and Validation to form */
                element.plusAsTab();
                element.bValidator();
            },
            controller: [
                '$scope',
                '$element',
                '$state',
                '$stateParams',
                function ($scope, $element, $state, $stateParams) {
                    $scope.onSubmit = function (data) {
                        /* Validate form before submit */
                        if (!$element.data('bValidator').validate()) {
                            return;
                        }
                        postData(data);
                    };
                    /* Posts  data to Sever */
                    function postData(data) {
                        var done = function () {
                            $state.go($scope.schema.onSave, $stateParams);
                        };
                        var fail = function () {
                            throw new Error('Failed to post data');
                        };
                        FormService.postResource(data).then(done, fail);
                    }
                    /* Get GPS */
                    $scope.getGps = function () {
                        $scope.data.gps_latitude = '12.7435';
                        $scope.data.gps_longitude = '17.9872';
                    };
                }
            ]
        };
    }
]);
angular.module('cgForm.timelog', []).factory('TimeLogFactory', function () {
    return {
        getCurrentTime: function () {
            var timestamp = new Date();
            timestamp.setHours(timestamp.getHours() + 5);
            timestamp.setMinutes(timestamp.getMinutes() + 30);
            return timestamp.toISOString().slice(0, 19).replace('T', ' ');
        }
    };
});
angular.module('cgForm.surveyForm', [
    'cgForm.formElement',
    'cgForm.formConfig',
    'cgForm.schemaFactory',
    'cgForm.formService',
    'cgForm.lodash',
    'ui.router',
    'cgForm.timelog'
]).directive('surveyForm', [
    'FormConfig',
    '_',
    'SchemaFactory',
    '$state',
    'FormService',
    '$rootScope',
    '$timeout',
    '$q',
    'TimeLogFactory',
    function (FormConfig, _, SchemaFactory, $state, FormService, $rootScope, $timeout, $q, TimeLogFactory) {
        return {
            templateUrl: 'template/surveyForm/surveyForm.html',
            restrict: 'E',
            replace: true,
            scope: {
                options: ' = ',
                fnct: '&onSave'
            },
            controller: 'surveyFormCtrl',
            link: function postLink(scope, element) {
                $rootScope.timestamp = TimeLogFactory.getCurrentTime();
                /* Load Json Schema for current state if not supplied through attributes */
                scope.schema = angular.copy(scope.options) || angular.copy(SchemaFactory.get($state.current.name));
                /* Prompt before form submit */
                scope.schema.properties.push({
                    flow: '',
                    type: 'heading',
                    label: 'Section Completed. Press Enter to Continue ',
                    valdn: ''
                });
                /* Initialize form data */
                scope.data = {};
                /* Merge schema with default config */
                scope.schema = _.extend(scope.schema, FormConfig);
                /* Load lookup data and Cross Check dynamic validation */
                angular.forEach(scope.schema.properties, function (elem) {
                    if (elem.type === 'lookup') {
                        FormService.getLookupData(elem.lookup).then(function (resp) {
                            elem.type = 'radio';
                            elem.items = resp.data;
                            var index = _.findIndex(scope.flow.properties, { name: elem.name });
                            if (index != -1) {
                                scope.flow.properties[index].type = 'radio';
                                scope.flow.properties[index].items = resp.data;
                            }
                        });
                    }
                    if (!_.isEmpty(elem.crossCheck)) {
                        FormService.getCrossCheckData(elem.crossCheck).then(function (resp) {
                            var condition = elem.crossCheck.condition.replace('{value}', resp.data.value);
                            elem.valdn = condition;
                            var index = _.findIndex(scope.flow.properties, { name: elem.name });
                            if (index != -1)
                                scope.flow.properties[index].valdn = condition;
                        });
                    }
                });
                var crossFlowPromises = [];
                var indexes = [];
                /* Check for CrossFlow conditions */
                angular.forEach(scope.schema.properties, function (elem, i) {
                    if (elem.crossFlow) {
                        if (elem.crossFlow.length > 0) {
                            crossFlowPromises.push(FormService.checkCrossFlow(elem.crossFlow));
                            indexes.push(i);
                        }
                    }
                });
                var elemIndex = 0;
                $q.all(crossFlowPromises).then(function (responses) {
                    angular.forEach(responses, function (resp) {
                        if (resp.data.check === false)
                            scope.schema.properties[indexes[elemIndex]].crossFlowCheck = false;
                        elemIndex++;
                    });
                    scope.schema.properties = _.remove(scope.schema.properties, function (element) {
                        if (angular.isUndefined(element.crossFlowCheck))
                            return true;
                        return element.crossFlowCheck !== false;
                    });
                    /* Render Initial Item in the flow after all hidden elements(without conditions) */
                    scope.flow.properties.push(angular.copy(scope.schema.properties[++hiddenCount]));
                    scope.flowSeq++;
                    scope.flowIndex++;
                });
                /* Evaluate values in hidden fields */
                angular.forEach(scope.schema.properties, function (elem) {
                    if (elem.name !== 'datastore' && elem.type === 'hidden')
                        elem.value = $rootScope.$eval(elem.value);
                    if (elem.type === 'hidden')
                        scope.data[elem.name] = elem.value;
                });
                /* Initialize checkbox element's data with empty objects in scope.data */
                var multipleSelectElements = _.filter(scope.schema.properties, { type: 'checkbox' });
                _.each(multipleSelectElements, function (item) {
                    scope.data[item.name] = {};
                });
                /* Store datastore value in scope to use in controller */
                scope.datastore = _.find(scope.schema.properties, { name: 'datastore' }).value;
                /* Get form data if already populated */
                FormService.getResource(scope.datastore).then(function (resp) {
                    delete resp.data.timelog;
                    delete resp.data.endtime;
                    angular.extend(scope.data, resp.data);
                });
                /* Bind Validation to form */
                element.bValidator();
                scope.flow = { properties: [] };
                //Render All hidden elements
                var hiddenCount = -1;
                //count all hidden elements
                scope.flowSeq = -1;
                scope.flowIndex = -1;
                for (var j = 0; j < scope.schema.properties.length; j++) {
                    var elem = scope.schema.properties[j];
                    if (elem.type === 'hidden' || elem.type === 'heading') {
                        scope.flow.properties.push(angular.copy(elem));
                        hiddenCount++;
                        scope.flowSeq++;
                        scope.flowIndex++;
                    } else
                        break;
                }
            }
        };
    }
]);
angular.module('cgForm.surveyForm').controller('surveyFormCtrl', [
    '$scope',
    '$element',
    'FormService',
    '$state',
    '$stateParams',
    '_',
    '$log',
    function ($scope, $element, FormService, $state, $stateParams, _, $log) {
        /* Posts  data to Sever */
        function postData() {
            var done = function () {
                if ($scope.schema.onSave !== '')
                    $state.go($scope.schema.onSave, $stateParams);
                else if ($scope.schema.condtion !== '' && $scope.schema.crossEntity === '') {
                    var data = $scope.data;
                    var transition = eval($scope.schema.condition) ? $scope.schema.success : $scope.schema.fail;
                    $state.go(transition, $stateParams);
                } else if ($scope.schema.crossEntity !== '') {
                    var params = $scope.schema.crossEntity.split(';');
                    var entity = params[0];
                    var entityId = params[1];
                    FormService.getResource(entity, $stateParams[entityId]).then(function (resp) {
                        var data = resp.data;
                        var transition = eval($scope.schema.condition) ? $scope.schema.success : $scope.schema.fail;
                        $state.go(transition, $stateParams);
                    });
                } else
                    $scope.fnct({ data: $scope.data });  //$rootScope.$eval($scope.schema.onSave);
            };
            var fail = function () {
                throw new Error('Failed to post data');
            };
            //Format muliselect values
            angular.forEach($scope.data, function (value, key) {
                if (_.isObject(value)) {
                    var selections = _.keys(value, function (val) {
                        return val;
                    });
                    $scope.data[key] = selections.join(';');
                }
            });
            FormService.postResource($scope.data).then(done, fail);
        }
        /* Validate form before submit */
        function isValidForm() {
            return $element.data('bValidator').validate();
        }
        /* Handles enter Event on Form to render next Question */
        $scope.showNext = function () {
            if (!isValidForm()) {
                return;
            }
            if ($scope.flowIndex < $scope.schema.properties.length - 1) {
                handleFlow();
                var nextCondition = $scope.schema.properties[$scope.flowIndex]['valdn'];
                var matches = nextCondition.match(/{.*}/);
                if (matches) {
                    var evalValue = $scope.$eval(matches[0].replace('{', '').replace('}', ''));
                    _.last($scope.flow.properties).valdn = nextCondition.replace(/{.*}/, evalValue);
                }
            } else {
                postData();
            }
        };
        /* Handles the flow condition logic  */
        function handleFlow() {
            $scope.flowSeq++;
            var nextItemInFlow = $scope.schema.properties[$scope.flowSeq];
            if (!_.isUndefined(nextItemInFlow)) {
                if (nextItemInFlow.type == 'checkbox')
                    $scope.data[nextItemInFlow.name] = {};
                else if (nextItemInFlow.type == 'dynamic_dropdown') {
                    var reqData = angular.copy(nextItemInFlow.metadata);
                    reqData['refValue'] = $scope.$eval(nextItemInFlow['metadata']['refValue']);
                    FormService.getDynamicDropdownData(reqData).then(function (resp) {
                        var dynamicDropdownIndex = $scope.flowSeq;
                        $scope.schema.properties[$scope.flowSeq].items = resp.data;
                        $scope.flow.properties.splice($scope.flow.properties.length - 1, 1);
                        $scope.flow.properties.push($scope.schema.properties[dynamicDropdownIndex]);
                    }, function () {
                        $log.error('Failed to fetch data');
                    });
                }
            }
            if (!nextItemInFlow) {
                postData();
                return;
            }
            if (nextItemInFlow.flow.length === 0 || $scope.$eval(nextItemInFlow.flow) === true) {
                $scope.flowIndex = $scope.flowSeq;
                $scope.flow.properties.push(angular.copy($scope.schema.properties[$scope.flowIndex]));
            } else {
                handleFlow();
            }
        }
        /* Handles focus event on control group and modifies flow accordingly */
        $scope.jumpFlow = function (itemName) {
            var flowIndex = _.findIndex($scope.flow.properties, { name: itemName });
            var seqIndex = _.findIndex($scope.schema.properties, { name: itemName });
            $scope.flow.properties = _.initial($scope.flow.properties, $scope.flow.properties.length - 1 - flowIndex);
            $scope.flowIndex = seqIndex;
            $scope.flowSeq = $scope.flowIndex;
            /* Remove all non-flow properties added to $scope.data (form data) as a result of flow navigation back */
            _.each($scope.data, function (value, key) {
                key = key.split('_')[0];
                var isPresent = _.findIndex($scope.flow.properties, { name: key });
                if (isPresent === -1) {
                    delete $scope.data[key];
                }
            });
        };
        /* Get GPS */
        $scope.getGps = function () {
            FormService.getGPS().then(function (gpsData) {
                $scope.data.gps_latitude = gpsData.latitude;
                $scope.data.gps_longitude = gpsData.longitude;
            });
        };
    }
]);
angular.module('cgForm.tableForm', [
    'cgForm.formElement',
    'cgForm.formConfig',
    'cgForm.formService',
    'cgForm.lodash',
    'cgForm.schemaFactory',
    'ui.router',
    'cgForm.joelpurra',
    'cgForm.timelog',
    'cgForm.schemaResolver'
]).directive('tableForm', [
    'FormConfig',
    '_',
    'SchemaFactory',
    '$state',
    'FormService',
    '$rootScope',
    'JoelPurra',
    'TimeLogFactory',
    'SchemaResolver',
    function (FormConfig, _, SchemaFactory, $state, FormService, $rootScope, JoelPurra, TimeLogFactory, SchemaResolver) {
        function postLink(scope, element) {
            $rootScope.timestamp = TimeLogFactory.getCurrentTime();
            /* Initialize form data */
            scope.data = {};
            /* Load Json Schema for current state if not supplied through attributes */
            scope.schema = angular.copy(scope.options) || angular.copy(SchemaFactory.get($state.current.name));
            /* Evaluate information in hidden fields */
            _.each(scope.schema.properties, function (elem) {
                if (elem.name !== 'datastore' && elem.type === 'hidden')
                    elem.value = $rootScope.$eval(elem.value);
                if (elem.type === 'hidden')
                    scope.data[elem.name] = elem.value;
            });
            /* Initialize checkbox element's data with empty objects in scope.data */
            var multipleSelectElements = _.filter(scope.schema.properties, { type: 'checkbox' });
            _.each(multipleSelectElements, function (item) {
                scope.data[item.name] = {};
            });
            /* Store datastore value in scope to use in controller */
            //scope.data.datastore = _.find(scope.schema.properties, {name: 'datastore'}).value;
            scope.datastore = _.find(scope.schema.properties, { name: 'datastore' }).value;
            /* Create a separate collection for hidden elements  */
            scope.schema.hiddenElements = _.filter(scope.schema.properties, { type: 'hidden' });
            /* Remove hidden items from schema */
            _.remove(scope.schema.properties, { type: 'hidden' });
            /* Get form data if already populated */
            FormService.getResource(scope.datastore).then(function (resp) {
                delete resp.data.timelog;
                delete resp.data.endtime;
                angular.extend(scope.data, resp.data);
            });
            /* Bind Enter as Tab and Validation to form */
            element.plusAsTab();
            element.bValidator();
        }
        return {
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl;
            },
            restrict: 'E',
            replace: true,
            scope: { options: ' = ' },
            link: postLink,
            controller: 'tableFormCtrl'
        };
    }
]);
angular.module('cgForm.tableForm').controller('tableFormCtrl', [
    '$scope',
    '$element',
    '$state',
    '$stateParams',
    'FormService',
    function ($scope, $element, $state, $stateParams, FormService) {
        $scope.onSubmit = function (data) {
            /* Validate form before submit */
            if (isValidForm())
                postData(data);
        };
        $scope.alcoholFreqFocus = function (data) {
        };
        function isValidForm() {
            return $element.data('bValidator').validate();
        }
        /* Posts form data to Sever */
        function postData(data) {
            var done = function () {
                if ($scope.schema.onSave !== '')
                    $state.go($scope.schema.onSave, $stateParams);
                else if ($scope.schema.condtion !== '' && $scope.schema.crossEntity === '') {
                    var data = $scope.data;
                    var transition = eval($scope.schema.condition) ? $scope.schema.success : $scope.schema.fail;
                    $state.go(transition, $stateParams);
                } else if ($scope.schema.crossEntity !== '') {
                    var params = $scope.schema.crossEntity.split(';');
                    var entity = params[0];
                    var entityId = params[1];
                    FormService.getResource(entity, $stateParams[entityId]).then(function (resp) {
                        var data = resp.data;
                        var transition = eval($scope.schema.condition) ? $scope.schema.success : $scope.schema.fail;
                        $state.go(transition, $stateParams);
                    });
                } else
                    $scope.fnct({ data: $scope.data });  //$rootScope.$eval($scope.schema.onSave);
            };
            var fail = function () {
                throw new Error('Failed to post data');
            };
            FormService.postResource(data).then(done, fail);
        }
    }
]);
angular.module('template/formElement/checkbox.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/checkbox.html', '<div class="checkbox" ng-repeat="item in config.items">\n' + '    <label>\n' + '        <div ng-if="$index==0">\n' + '            <input data-bvalidator="{{config.valdn}}" data-bvalidator-msg="Please Select an option" type="checkbox"\n' + '                   name="{{config.name}}[]"\n' + '                   value="{{item.value}}"\n' + '                   ng-model="data[config.name][item.value]" init-focus="{{config.initFocus}}"/>\n' + '            {{item.text}}\n' + '        </div>\n' + '        <div ng-if="$index!=0">\n' + '            <input type="checkbox"\n' + '                   name="{{config.name}}[]"\n' + '                   value="{{item.value}}"\n' + '                   ng-model="data[config.name][item.value]"/>\n' + '            {{item.text}}\n' + '\n' + '        </div>\n' + '\n' + '    </label>\n' + '</div>');
    }
]);
angular.module('template/formElement/control-group-heading.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/control-group-heading.html', '<div class="control-group" id="{{config.name}}-control-group" scroll-top="{{config.scrollTop}}">\n' + '    <div class="control-label" >\n' + '        <div class="alert alert-error" style="font-weight:bold">{{config.label}}<a  ng-if="config.help" popover="{{config.help}}" popover-trigger="mouseenter">Help</a></div>\n' + '    </div>\n' + '    <div class="controls"></div>\n' + '</div>');
    }
]);
angular.module('template/formElement/control-group.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/control-group.html', '<div class="control-group" id="{{config.name}}-control-group" scroll-top="{{config.scrollTop}}">\n' + '    <div class="control-label">\n' + '        <label style="font-weight:bold">{{config.label}} {{config.dynamicValue}}<a  ng-if="config.help" popover="{{config.help}}" popover-trigger="mouseenter">Help</a></label>\n' + '        <div ng-if="config.image!=\'\'"><img ng-src="{{config.image}}" /></div>\n' + '    </div>\n' + '    <div class="controls" ng-click="jumpFlow(config.name)"></div>\n' + '\n' + '</div>');
    }
]);
angular.module('template/formElement/dropdown.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/dropdown.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '        <select class="form-control" data-bvalidator="{{config.valdn}}"\n' + '                data-bvalidator-msg="Please select an option"\n' + '                ng-model="data[config.name]"\n' + '                init-focus>\n' + '            <option ng-repeat="item in config.items" value="{{item.value}}" init-focus="{{config.initFocus}}">\n' + '                {{item.text}}\n' + '            </option>\n' + '\n' + '        </select>\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/dynamic_dropdown.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/dynamic_dropdown.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '        <select class="form-control" data-bvalidator="{{config.valdn}}"\n' + '                data-bvalidator-msg="Please select an option"\n' + '                ng-model="data[config.name]"\n' + '                init-focus>\n' + '            <option ng-repeat="item in config.items" value="{{item.value}}" init-focus="{{config.initFocus}}">\n' + '                {{item.text}}\n' + '            </option>\n' + '\n' + '        </select>\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/gps.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/gps.html', '<label>Latitude</label>\n' + '<div class="row">\n' + '    <div class="col-lg-3">\n' + '        <input class="form-control" type="text" ng-model="data[config.name+\'_latitude\']"\n' + '               readonly="readonly"/>\n' + '    </div>\n' + '</div>\n' + '<label>Longitude</label>\n' + '<div class="row">\n' + '    <div class="col-lg-3">\n' + '        <input class="form-control" type="text"\n' + '               ng-model="data[config.name+\'_longitude\']"\n' + '               readonly="readonly"/> &nbsp;\n' + '\n' + '    </div>\n' + '    <a class="btn btn-danger btn-small" href="" ng-click="getGps()">Get GPS</a>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/hidden.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/hidden.html', '<input type="text" value="{{config.value}}" ng-model="data[config.name]" style="display: none;" />');
    }
]);
angular.module('template/formElement/label-heading.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/label-heading.html', '<div id="{{config.name}}-control-group" scroll-top="{{config.scrollTop}}">\n' + '    <div class="alert alert-danger" style="font-weight:bold">{{config.label}}<a ng-if="config.help"\n' + '                                                                                popover="{{config.help}}"\n' + '                                                                                popover-trigger="mouseenter">Help</a>\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/label.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/label.html', '<div id="{{config.name}}-control-group" scroll-top="{{config.scrollTop}}">\n' + '    <label ng-if="config.label">{{config.label}} {{config.dynamicValue}}<a ng-if="config.help"\n' + '                                                                               popover="{{config.help}}"\n' + '                                                                               popover-trigger="mouseenter">Help</a></label>\n' + '\n' + '    <div ng-if="config.image!=\'\'"><img ng-src="{{config.image}}"/></div>\n' + '    <div class="controls" ng-click="jumpFlow(config.name)"></div>\n' + '\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/lookup.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/lookup.html', '<div class="radio" ng-repeat="item in config.items">\n' + '    <label>\n' + '        <div ng-if="$index==0"><input data-bvalidator="{{config.valdn}}" data-bvalidator-msg="Please select an option"\n' + '                                      type="radio" name="{{config.name}}"\n' + '                                      value="{{item.value}}" ng-model="data[config.name]"\n' + '                                      init-focus="{{config.initFocus}}"/> {{item.text}}\n' + '        </div>\n' + '        <div ng-if="$index!=0"><input type="radio" name="{{config.name}}" value="{{item.value}}"\n' + '                                      ng-model="data[config.name]"/> {{item.text}}\n' + '        </div>\n' + '    </label>\n' + '</div>');
    }
]);
angular.module('template/formElement/password.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/password.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '        <input class="form-control" type="password" data-bvalidator="{{config.valdn}}"\n' + '               ng-model="data[config.name]" init-focus="{{config.initFocus}}"/>\n' + '\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/radio-inline.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/radio-inline.html', '<label class="radio-inline" ng-repeat="item in config.items">\n' + '    <div ng-if="$index==0"><input  data-bvalidator="{{config.valdn}}" data-bvalidator-msg="Please select an option" type="radio" name="{{config.name}}"\n' + '                                   value="{{item.value}}" ng-model="data[config.name]" init-focus="{{config.initFocus}}"/> {{item.text}}\n' + '    </div>\n' + '    <div ng-if="$index!=0"><input  type="radio" name="{{config.name}}" value="{{item.value}}"\n' + '                                   ng-model="data[config.name]"/> {{item.text}}\n' + '    </div>\n' + '</label>');
    }
]);
angular.module('template/formElement/radio.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/radio.html', '<div class="radio" ng-repeat="item in config.items">\n' + '    <label>\n' + '        <div ng-if="$index==0"><input data-bvalidator="{{config.valdn}}" data-bvalidator-msg="Please select an option"\n' + '                                      type="radio" name="{{config.name}}"\n' + '                                      value="{{item.value}}" ng-model="data[config.name]"\n' + '                                      init-focus="{{config.initFocus}}"/> {{item.text}}\n' + '        </div>\n' + '        <div ng-if="$index!=0"><input type="radio" name="{{config.name}}" value="{{item.value}}"\n' + '                                      ng-model="data[config.name]"/> {{item.text}}\n' + '        </div>\n' + '    </label>\n' + '</div>');
    }
]);
angular.module('template/formElement/readonly.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/readonly.html', '<input class="form-control" type="text"  ng-model="data[config.name]" readonly="readonly"/>\n' + '');
    }
]);
angular.module('template/formElement/select_singletext.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/select_singletext.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '        <select class="form-control" data-bvalidator="required" data-bvalidator-msg="Please select an option"\n' + '                ng-model="data[config.name+\'_unit\']" init-focus="{{config.initFocus}}">\n' + '            <option value=""></option>\n' + '            <option ng-repeat="item in config.items" value="{{item.value}}">{{item.text}}</option>\n' + '        </select>\n' + '    </div>\n' + '</div>\n' + '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '        <input class="form-control" type="text" data-bvalidator="{{config.valdn}}"\n' + '               ng-model="data[config.name+\'_value\']" class="input-medium"/>\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/select_text.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/select_text.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '    <select class="form-control" data-bvalidator="required" data-bvalidator-msg="Please select an option"\n' + '        ng-model="data[config.name+\'_unit\']" init-focus="{{config.initFocus}}">\n' + '    <option value=""></option>\n' + '    <option ng-repeat="item in config.items" value="{{item.value}}">{{item.text}}</option>\n' + '</select>\n' + '        </div></div>\n' + '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '<span ng-repeat="item in config.items">\n' + '    <input class="form-control" type="text" data-bvalidator="{{item.valdn}}"\n' + '           ng-model="data[config.name+\'_value\']" class="input-medium" ng-if="data[config.name+\'_unit\']==item.value"\n' + '           placeholder="{{item.value}}"/>\n' + '</span>\n' + '        </div></div>\n' + '');
    }
]);
angular.module('template/formElement/suggest.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/suggest.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '        <input class="form-control" type="text"\n' + '               data-bvalidator="{{config.valdn}}"\n' + '               ng-model="data[config.name]"\n' + '               typeahead="item.text for item in config.items | filter:$viewValue"\n' + '               init-focus="{{config.initFocus}}"/>\n' + '\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/text.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/text.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '        <input type="text" data-bvalidator="{{config.valdn}}" id="{{config.name}}"\n' + '               class="form-control" ng-model="data[config.name]" init-focus="{{config.initFocus}}"/>\n' + '    </div>\n' + '</div>\n' + '');
    }
]);
angular.module('template/formElement/text_select.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/text_select.html', '<span ng-repeat="item in config.items">\n' + '\n' + '    <div class="row">\n' + '        <div class="col-lg-3">\n' + '\n' + '            <input class="form-control" type="text" data-bvalidator="{{item.valdn}}"\n' + '                   ng-model="data[config.name+\'_value\']" class="input-medium"\n' + '                   ng-if="data[config.name+\'_unit\']==item.value"\n' + '                   placeholder="{{item.value}}"/>\n' + '        </div>\n' + '    </div>\n' + '</span>\n' + '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '        <select class="form-control" data-bvalidator="required" data-bvalidator-msg="Please select an option"\n' + '                ng-model="data[config.name+\'_unit\']" init-focus="{{config.initFocus}}">\n' + '            <option value=""></option>\n' + '            <option ng-repeat="item in config.items" value="{{item.value}}">{{item.text}}</option>\n' + '        </select>\n' + '    </div>\n' + '</div>\n' + '\n' + '');
    }
]);
angular.module('template/formElement/textarea.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/formElement/textarea.html', '<div class="row">\n' + '    <div class="col-lg-3">\n' + '\n' + '    <textarea class="form-control"  data-bvalidator="{{config.valdn}}" ng-model="data[config.name]" init-focus="{{config.initFocus}}" > </textarea>\n' + '</div>\n' + '    </div>\n' + '');
    }
]);
angular.module('template/standardForm/standardForm.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/standardForm/standardForm.html', '<form ng-submit="onSubmit(data)" action="javascript:void(0)" role="form" class="well">\n' + '\n' + '    <div class="form-group" ng-repeat="element in schema.properties" >\n' + '        <form-element config="{{element}}"></form-element>\n' + '    </div>\n' + '\n' + '    <button class="btn btn-small btn-primary"\n' + '            type="submit" data-plus-as-tab="false">Save\n' + '    </button>\n' + '\n' + '</form>\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '');
    }
]);
angular.module('template/surveyForm/surveyForm.html', []).run([
    '$templateCache',
    function ($templateCache) {
        $templateCache.put('template/surveyForm/surveyForm.html', '<div class="well"  ng-enter="showNext()">\n' + '\n' + '    <div class="form-group" ng-repeat="element in flow.properties">\n' + '        <form-element config="{{element}}"></form-element>\n' + '    </div>\n' + '\n' + '\n' + '    <button class="btn btn-small btn-primary" ng-click="showNext()">\n' + '        Next &#187;\n' + '    </button>\n' + '\n' + '\n' + '</div>\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '');
    }
]);