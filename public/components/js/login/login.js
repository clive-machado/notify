var request 						= require('request')

module.exports = function (app) {
	app.controller('loginApp', ['$scope', '$state', '$rootScope', '$cookies', function($scope, $state, $rootScope, $cookies) {		
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
            $cookies.put('auth', body.application_user.authtoken)
            $cookies.put('uid', body.application_user.uid)
            $cookies.put('fname', body.application_user.first_name)
            $cookies.put('lname', body.application_user.last_name)
            $cookies.put('email', body.application_user.email)
            $state.go('dashboard')
          }
        }
      })
    }
	}])
}

