do(app = angular.module('myApp.stateTransitions', [])) ->
  app.constant 'StateTransitions', {

    "enum.areaDetail.house": {
      to: "enum.houseDetail.basicInf",
      param: "houseId"
    },

    "enum.houseDetail.household": {
      to: "enum.householdDetail.basicInf",
      param: "householdId"
    },

    "enum.householdDetail.member": {
      to: "enum.memberDetail.basicInf",
      param: "memberId"
    },

    "enum.householdDetail.visit": {
      to: "enum.visitDetail.basicInf",
      param: "visitId"
    },

    "enum.householdDetail.head": {
      to: "enum.headDetail.basicInf",
      param: "memberId"
    },

    "enum.householdDetail.hosp": {
      to: "enum.hospDetail.basicInf",
      param: "memberId"
    },

    "enum.householdDetail.esl": {
      to: "enum.deathDetail.basicInf",
      param: "deathId"
    },

    "hc.householdDetail.visit": {
      to: "hc.visitDetail.basicInf",
      param: "visitId"
    }
  }