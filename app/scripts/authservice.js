(function(){

    angular.module('trollii-web.authservice', [])
        .factory('authservice', function(){

            var logout = function(){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('profile');
                window.location = '';
            }

            return {
                logout: logout
            }
        });

}());