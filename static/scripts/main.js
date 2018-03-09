(function(){

    angular.module('trollii-web', [])
    .controller('mainController', function(){
       
        

    })
    .controller('signupController', function($scope, $http){
      
        $scope.signup = function(serviceUrl){

            console.log($scope.email);

            var data = {
                email: $scope.email,
                password: $scope.password
            };
            
            $http.post(serviceUrl + 'api/auth/signup', data)
            .then(function(data){
                console.log('success', data);   
            }, function(){
                console.log('error');
            });

        };

    });

}());