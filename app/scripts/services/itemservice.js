(function(){

    angular.module('trollii-web.itemservice', [])
        .factory('itemservice', function($http){

            var getItems = function(listid){

                var token = localStorage.getItem('accessToken');

                var config = {
                    headers:  {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                };

                return $http.get('http://localhost:8080/api/item/' + listid, config);
            };


            return {
                getItems: getItems
            }
        });

}());