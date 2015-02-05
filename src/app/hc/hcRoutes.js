angular.module('hcRoutes', [])
    .constant('hcRoutes', {
        name: 'hc',
        url: '/hc',
        tpl: 'hc/hc.jade',
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
                title: 'Area Detail',
                prevState: {name: 'hc.area', title: 'Areas'},
                children: [
                    {
                        name: 'house',
                        url: '/house',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Houses',
                        msg: 'Select a House'
                    }
                ]
            },
            {
                name: 'houseDetail',
                url: '/area/:areaId/house/:houseId',
                tpl: 'tpls/pageDetail.jade',
                title: 'House Detail',
                prevState: {name: 'hc.areaDetail.house', title: 'Houses'},
                children: [
                    {
                        name: 'household',
                        url: '/household',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Households',
                        msg: 'Select a Household'
                    }
                ]
            },
            {
                name: 'householdDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId',
                tpl: 'tpls/pageDetail.jade',
                title: 'Household Detail',
                prevState: {name: 'hc.houseDetail.household', title: 'Households'},
                children: [
                    {
                        name: 'visit',
                        url: '/visit',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Visits',
                        addNew: true,
                        msg: 'Add a new Visit'

                    },
                    {
                        name: 'member',
                        url: '/member',
                        tpl: 'tpls/dataGrid.jade',
                        title: 'Members',
                        msg: 'Select a Member'
                    }

                ]
            },
            {
                name: 'visitDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/visit/:visitId',
                tpl: 'tpls/pageDetail.jade',
                title: '',
                prevState: {name: 'hc.householdDetail.visit', title: 'Visits'},
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
                tpl: 'tpls/pageDetailNavDisabled.jade',
                title: 'Member Detail',
                prevState: {name: 'hc.householdDetail.member', title: 'Members'},
                children: [
                    {
                        name: 'bp1',
                        url: '/bp1',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '1.BP1-General Information'
                    },
                    {
                        name: 'basicInf',
                        url: '/basicInf',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '2.Basic Inf'
                    },
                    {
                        name: 'cam',
                        url: '/cam',
                        tpl: 'photoConsent/photoConsent.jade',
                        title: '3.Photo Capture'
                    },

                    {
                        name: 'photo',
                        url: '/photo',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '4.Photo Capture Details'
                    },

                    {
                        name: 'ta',
                        url: '/ta',
                        tpl: 'tpls/surveyFormDirective.jade',


                        title: '5.Tobacco & Alcohol'
                    },
                    {
                        name: 'alcoholFreq',
                        url: '/alcoholFreq',
                        tpl: 'tpls/alcoholFormDirective.jade',
                        title: '6.Alcohol Freq'
                    },
                    {
                        name: 'alcohol2',
                        url: '/alcohol2',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '7.Alcohol 2'
                    },
                    {
                        name: 'pmh',
                        url: '/pmh',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '8.Personal Medical History'
                    },
                    {
                        name: 'fmh',
                        url: '/fmh',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '9.Family Background & Medical History'
                    },
                    {
                        name: 'fmhDisease',
                        url: '/fmhDisease',
                        tpl: 'tpls/fmhDiseaseFormDirective.jade',
                        title: '10.Family Disease History'
                    },
                    {
                        name: 'rh',
                        url: '/rh',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '11.Reproductive History'
                    },
                    {
                        name: 'pa',
                        url: '/pa',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '12.Daily Physical Activities'
                    },
                    {
                        name: 'mood',
                        url: '/mood',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '13.General Mood participants'
                    },
                    {
                        name: 'bp2',
                        url: '/bp2',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '14.Repetition of Bio measurements'
                    }



                ]
            },
            {
                name: 'ffqDetail',
                url: '/area/:areaId/house/:houseId/household/:householdId/ffq/:memberId',
                tpl: 'tpls/pageDetailNavDisabled.jade',
                title: 'FFQ Detail',
                prevState: {name: '', title: 'FFQ'},
                children: [
                    {
                        name: 'general',
                        url: '/general',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '1.General Information'
                    },
                    {
                        name: 'bev',
                        url: '/bev',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '2.Beverages'
                    },
                    {
                        name: 'cls',
                        url: '/cls',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '3.Cereals'
                    },
                    {
                        name: 'pls',
                        url: '/pls',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '4.Pulses'
                    },
                    {
                        name: 'veg',
                        url: '/veg',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '5.Vegetables'
                    },
                    {
                        name: 'raw',
                        url: '/raw',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '6.Raw'
                    },
                    {
                        name: 'fruits',
                        url: '/fruits',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '7.Fruits'
                    },
                    {
                        name: 'juice',
                        url: '/juice',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '8.Juice'
                    },
                    {
                        name: 'nonveg',
                        url: '/nonveg',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '9.Non-Veg'
                    },
                    {
                        name: 'sweets',
                        url: '/sweets',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '10.Sweets'
                    },
                    {
                        name: 'spicemix',
                        url: '/spicemix',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '11.SpiceMix'
                    },
                    {
                        name: 'snacks',
                        url: '/snacks',
                        tpl: 'tpls/ffqFormDirective.jade',
                        title: '12.Snacks'
                    },
                    {
                        name: 'others',
                        url: '/others',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '13.Other Items'
                    },
                    {
                        name: 'foodAdditives',
                        url: '/foodAdditives',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '14.Food Additives'
                    },

                    {
                        name: 'invitationCard',
                        url: '/invitationCard',
                        tpl: 'tpls/surveyFormDirective.jade',
                        title: '15.Invitation Card'
                    }
                ]
            }


        ]

    });