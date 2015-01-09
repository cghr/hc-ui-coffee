(function (app) {

    app.factory('AuthDefaultConfig', function () {


        return {
            authUrl: 'api/security/auth',
            registerUrl: 'api/user',
            logoutUrl: 'api/security/logout'
        }


    })
})(angular.module('authDefaultConfig', []));