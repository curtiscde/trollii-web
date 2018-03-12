(function(){

    angular.module('trollii-web.list', [
        'trollii-web.userservice',
        'trollii-web.listservice'
    ])
        .controller('listController', function($scope, userservice, listservice){

            $scope.user = userservice.user;

            listservice.getLists().then(function(data){
                console.log('data', data);
            });

        });

}());