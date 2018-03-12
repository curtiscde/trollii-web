(function(){

    angular.module('trollii-web.userservice', [])
        .factory('userservice', function(){

            var user = {
                isAuthenticated: false
            };

            return {
                user: user
            }
        });

}());