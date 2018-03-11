var lock = new Auth0Lock('pDx70JLEPV6h0w4Bxjhq8xzV8Lgmt7xK', 'curt.auth0.com',{
    languageDictionary: {"title":"Trollii"},
    allowedConnections: ["Username-Password-Authentication","google-oauth2"],
    rememberLastLogin: false
});

(function(){

    lock.on("authenticated", function(authResult) {
        // Use the token in authResult to getUserInfo() and save it to localStorage
        lock.getUserInfo(authResult.accessToken, function(error, profile) {
          if (error) {
            // Handle error
            return;
          }
      
          document.getElementById('nick').textContent = profile.nickname;
      
          localStorage.setItem('accessToken', authResult.accessToken);
          localStorage.setItem('profile', JSON.stringify(profile));
        });
    });



    angular.module('trollii-web', [])
    .controller('mainController', function($scope){

    })
    .controller('signupController', function($scope, $http){
      
        $scope.signup = function(serviceUrl){

            // webAuth.authorize();

            lock.show(function(err, profile, token) {
                if (err) {
                  // Error callback
                  console.error("Something went wrong: ", err);
                } else {
                  // Success calback  

                  console.log('token', token);
                  console.log('userProfile', JSON.stringify(profile));
            
                  // Save the JWT token.
                  localStorage.setItem('userToken', token);
                  // Save the profile
                  localStorage.setItem('userProfile', JSON.stringify(profile));
                }
            });

        };

    });

}());