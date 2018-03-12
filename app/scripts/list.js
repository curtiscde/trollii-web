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
                        var topListId = data.data[0]._id;
                        
                        itemservice.getItems(topListId).then(function(itemData){
                            $scope.items = itemData.data;
                            console.log(itemData.data);
                        });

                    }
                });

            }

        });

}());