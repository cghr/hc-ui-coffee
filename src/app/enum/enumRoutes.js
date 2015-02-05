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
                tpl: 'tpls/pageDetailNavDisabled.jade',
                defaultState: 'member',
                title: 'Members',
                prevState: {name: 'enum.houseDetail.household', title: 'Households'},
                children: [
                    {
                        name: 'visit',
                        url: '/visit',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Visits',
                        addNew: true,
                        msg: 'Add a new visit'
                    },
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Information'
                    },
                    {
                        name: 'member',
                        url: '/member',
                        tpl: 'enum/dataGrid/dataGrid.jade',
                        title: 'Members',
                        addNew: true
                    },
                    {
                        name: 'commonQs',
                        url: '/commonQs',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Common Qs'
                    },
                    {
                        name: 'foodItems',
                        url: '/foodItems',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Food Items'
                    },
                    {
                        name: 'hospInf',
                        url: '/hospInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Hospitalization Inf'
                    },
                    {
                        name: 'hosp',
                        url: '/hosp',
                        tpl: 'enum/dataGrid/dataGrid.jade',
                        title: 'Hospitalization',
                        addNew: true
                    },
                    {
                        name: 'deathInf',
                        url: '/deathInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Death Inf'
                    },
                    {
                        name: 'death',
                        url: '/death',
                        tpl: 'enum/dataGrid/dataGrid.jade',
                        title: 'Deaths',
                        addNew: true
                    },
                    {
                        name: 'contact',
                        url: '/contact',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Contact Inf',
                        stateChangeStartMsg: 'Enumeration of the Household Completed'
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
                name: 'hospDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/hosp/:memberId',
                tpl: 'tpls/pageDetail.jade',
                title: '',
                prevState: {name: 'enum.householdDetail.hosp', title: 'Hospitalization'},
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
                url: '/area/:areaId/house/:houseId/household/:householdId/death/:memberId',
                tpl: 'tpls/pageDetail.jade',
                title: '',
                prevState: {name: 'enum.householdDetail.death', title: 'Deaths'},
                children: [
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: 'Basic Inf'
                    }
                ]

            }

        ]


    });