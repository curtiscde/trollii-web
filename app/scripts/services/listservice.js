(function(){

    angular.module('trollii-web.listservice', [])
        .factory('listservice', function($http){

            var getLists = function(){

                var token = localStorage.getItem('accessToken');

                var config = {
                    headers:  {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                };

                return $http.get('http://localhost:8080/api/list', config);
            };


            return {
                getLists: getLists
            }
        });

}());