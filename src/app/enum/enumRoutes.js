angular.module('enumRoutes', [])
    .constant('enumRoutes', {
        name: 'enum',
        url: '/enum',
        tpl: 'enum/enum.jade',
        children: [
            {
                name: 'area',
                url: '/area',
                tpl: 'tpls/dataGridCentered.jade',
                title: 'Areas',
                msg: 'Select an Area',
                children: []

            },
            {
                name: 'cod',
                url: '/area/:areaId/house/:houseId/household/:householdId/esl/:deathId/cod',
                tpl: 'tpls/cod.html'
            },
            {
                name: 'areaDetail',
                url: '/area/:areaId',
                tpl: 'tpls/pageDetail.jade',
                title: 'Houses',
                prevState: {name: 'enum.area', title: 'Areas'},
                children: [
                    {
                        name: 'house',
                        url: '/house',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Houses',
                        addNew: true,
                        msg: 'Add/Select a House'
                    }
                ]
            },
            {
                name: 'houseDetail',
                url: '/area/:areaId/house/:houseId',
                tpl: 'tpls/pageDetail.jade',
                title: 'Households',
                prevState: {name: 'enum.areaDetail.house', title: 'Houses'},
                children: [
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Inf'
                    },
                    {
                        name: 'household',
                        url: '/household',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Households',
                        addNew: true,
                        msg: 'Add/Select a Household'
                    }
                ]
            },
            {
                name: 'householdDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId',
                tpl: 'tpls/pageDetail.jade',
                defaultState: 'member',
                title: 'Members',
                prevState: {name: 'enum.houseDetail.household', title: 'Households'},
                children: [
                    //{
                    //    name: 'visit',
                    //    url: '/visit',
                    //    tpl: 'tpls/dataGrid.jade',
                    //    title: 'Visits',
                    //    addNew: true,
                    //    msg: 'Add a new visit'
                    //},
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Information'
                    },
                    {
                        name: 'deathInf',
                        url: '/deathInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Death Inf'
                    },
                    {
                        name: 'consent',
                        url: '/consent',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Consent'
                    },

                    //{
                    //    name: 'death',
                    //    url: '/death',
                    //    tpl: 'enum/dataGrid/dataGrid.jade',
                    //    title: 'Deaths',
                    //    addNew: true
                    //},
                    {
                        name: 'esl',
                        url: '/esl',
                        //tpl: 'tpls/dataGrid.jade',
                        tpl:'enum/dataGrid/dataGrid.jade',
                        title: 'Deaths',
                        addNew: true
                    }
                ]
            },
            {
                name: 'visitDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/visit/:visitId',
                tpl: 'tpls/pageDetail.jade',
                title: '',
                prevState: {name: 'enum.householdDetail.visit', title: 'Visits'},
                children: [
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Inf'
                    }
                ]

            },
            {
                name: 'memberDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/member/:memberId',
                tpl: 'tpls/pageDetail.jade',
                title: '',
                prevState: {name: 'enum.householdDetail.member', title: 'Members'},
                children: [
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Inf'
                    }
                ]

            },

            {
                name: 'deathDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/death/:deathId',
                tpl: 'tpls/pageDetail.jade',
                title: '',
                prevState: {name: 'enum.householdDetail.esl', title: 'Deaths'},
                children: [
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Inf'
                    }
                ]

            },{
                name:'vaDetail',
                url:'/area/:areaId/house/:houseId/household/:householdId/va/:deathId',
                tpl:'tpls/pageDetail.jade',
                title:'',
                prevState: {name: 'enum.householdDetail.esl', title: 'Deaths'},
                children:[

                    {
                        name:'neonate',
                        url:'/neonate',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Birth/Delivery Details'
                    },
                    {
                        name:'vaInjury',
                        url:'/injury',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Injury'
                    },
                    {
                        name:'vaChild',
                        url:'/child',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Child Birth Details'
                    },

                    {
                        name:'adult',
                        url:'/adult',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Past Medical History'
                    },
                    {
                        name:'maternal',
                        url:'/maternal',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Pregnancy Details'
                    },
                    {
                        name:'tobaccoDeath',
                        url:'/tobaccoDeath',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Tobacco Deceased'
                    },
                    {
                        name:'tobaccoResp',
                        url:'/tobaccoResp',
                        tpl:'tpls/surveyFormDirective.jade',
                        title:'Tobacco Respondent'
                    }

                ]

            },
            {
                name: 'eslDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/esl/:deathId',
                tpl: 'enum/esl/esl.html',
                title: '',
                prevState: {name: 'enum.householdDetail.esl', title: 'Deaths'},
                children: [{"label": "Birth Details", "name": "birthDetails", "range": "0-5"}, {
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
                }, {"label": "Pregnancy", "name": "pregnancy", "range": "12-49"}, {
                    "label": "Medical History",
                    "name": "medicalHistory",
                    "range": "1-100"
                }, {"label": "Health Care", "name": "healthcare", "range": "0-100"}, {
                    "label": "Tobacco",
                    "name": "tobacco",
                    "range": "5-100"
                },{
                    "label": "Feedback",
                    "name": "feedback",
                    "range": "0-100"
                }]


            }

        ]


    });