do (app = angular.module('forgotPassword')) ->


  app.controller 'ForgotPasswordCtrl', (toaster) ->

    this.sendEmail = (email) ->
      toaster.pop('success', "", "Password sent to your email")
