var request 						= require('request')

module.exports = function (app) {
	app.controller('loginApp', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope, loginService) {		
    $scope.username
    $scope.password
    $scope.login = function (uname, pass){
      var opt = {
        url : "https://api.built.io/v1/application/users/login",
        method : "post",
        headers : { 
          'application_api_key' : 'bltf3d1aceb32d4fb7a',
          'content-type' : 'application/json'
        },
        form : {
          "application_user": {
            "username" : uname,
            "password" : pass
          }
        }
      }
      request(opt, function (err, res, body){
        if (typeof body == "string"){
          body = JSON.parse(body)
          if(body.error_message)
            alert("Couldn't sign you in")
          if(body.application_user){  
            $rootScope.auth = body.application_user.authtoken
            $state.go('dashboard')
          }
        }
      })
    }
	}])
}

