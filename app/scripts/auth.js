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

    angular.module('trollii-web.auth', [
        'trollii-web.userservice'
    ])
        .controller('authController', function($scope, userservice){

            userservice.user.isAuthenticated = false;
            console.log('userservice.user.isAuthenticated', userservice.user.isAuthenticated);

            $scope.user = userservice.user;
    
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
    
                  userservice.user.isAuthenticated = true;
                    console.log('userservice.user.isAuthenticated', userservice.user.isAuthenticated);
    
                    $scope.$apply();
                });
            });
    
            if (localStorage.getItem('accessToken')){
                userservice.user.isAuthenticated = true;
                lock.getUserInfo(localStorage.getItem('accessToken'), function(error, profile) {
                    if (error) {
                        localStorage.removeItem('accessToken');
                        userservice.user.isAuthenticated = false;
                        $scope.$apply();
                        return;
                    }
    
                    console.log(profile);
                    console.log('userservice.user.isAuthenticated', userservice.user.isAuthenticated);
    
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

        });

}());