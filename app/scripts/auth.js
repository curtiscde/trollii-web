(function(){

    var lock = new Auth0Lock('pDx70JLEPV6h0w4Bxjhq8xzV8Lgmt7xK', 'curt.auth0.com',{
        languageDictionary: {"title":"Trollii"},
        allowedConnections: ["Username-Password-Authentication","google-oauth2"],
        rememberLastLogin: false,
        auth: {
            responseType: 'id_token token',
            params: {
              scope: 'openid profile',
              audience: 'https://trollii.com/'
            }
        }
    });

    angular.module('trollii-web.auth', [])
        .controller('authController', function($scope){

            $scope.isAuthenticated = false;
            console.log('$scope.isAuthenticated', $scope.isAuthenticated);
    
            lock.on("authenticated", function(authResult) {
    
                // Use the token in authResult to getUserInfo() and save it to localStorage
                lock.getUserInfo(authResult.accessToken, function(error, profile) {
                  if (error) {
                    // Handle error
                    return;
                  }
              
                  localStorage.setItem('accessToken', authResult.accessToken);
                  localStorage.setItem('profile', JSON.stringify(profile));
        
                  console.log(authResult.accessToken);
                  console.log(profile);
    
                  $scope.isAuthenticated = true;
                    console.log('$scope.isAuthenticated', $scope.isAuthenticated);
    
                    $scope.$apply();
                });
            });
    
            if (localStorage.getItem('accessToken')){
                $scope.isAuthenticated = true;
                lock.getUserInfo(localStorage.getItem('accessToken'), function(error, profile) {
                    if (error) {
                        localStorage.removeItem('accessToken');
                        $scope.isAuthenticated = false;
                        $scope.$apply();
                        return;
                    }
    
                    console.log(profile);
                    console.log('$scope.isAuthenticated', $scope.isAuthenticated);
    
                    $scope.profile = {
                        picture: profile.picture,
                        nickname: profile.nickname
                    };
    
                    $scope.$apply();
                });
            }
    
            $scope.login = function(){
                lock.show();
            }
    
            $scope.logout = function(){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('profile');
                window.location = '';
            }

        });

}());