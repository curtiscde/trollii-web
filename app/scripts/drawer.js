(function(){

    angular.module('trollii-web.drawer', [
        'trollii-web.authservice'
    ])
        .controller('drawerController', function($scope, authservice){

            $scope.logout = function(){
                authservice.logout();
            }

        });

}());