(function(){

    angular.module('trollii-web.list', [
        'trollii-web.userservice',
        'trollii-web.listservice',
        'trollii-web.itemservice'
    ])
        .controller('listController', function($scope, userservice, listservice, itemservice){

            $scope.user = userservice.user;

            if (userservice.user.isAuthenticated){

                listservice.getLists().then(function(data){
                    if (data.data.length){
                        var topList = data.data[0];
                        $scope.items = topList.items;
                    }
                });

            }

        });

}());