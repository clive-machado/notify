var request 						= require('request')

module.exports = function (app) {
	app.controller('loginApp', [
    '$scope', 
    '$state', 
    '$rootScope', 
    '$cookies', 
    'clickEvent', 
    '$timeout',
    function($scope, $state, $rootScope, $cookies, clickEvent, $timeout) {		
    $scope.username
    $scope.password
    $scope.googleButtonSpin   = false;
    $scope.loginButtonSpin    = false;
    gapi.load('auth2', function() {
      gapi.auth2.init({
          client_id: '741864869914-3sf0kb9c4nkhoju2asmh00f4cce7omrr.apps.googleusercontent.com'
        })
        var GoogleAuth  = gapi.auth2.getAuthInstance()
        $scope.googleLogin = function () {
        $scope.googleButtonSpin = true
        $timeout(function(){
          $scope.googleButtonSpin = false;
        }, 2000);
        GoogleAuth.signIn().then(function(googleUser) {
          clickEvent.onGoogleSignIn(googleUser.Zi.access_token)
          .then(function(data){
            var notice = new PNotify({
                title: 'User logged In',
                type: 'success',
                animate_speed: 'fast'
            })
            notice.get().click(function() {
              notice.remove()
            })
            $cookies.put('auth', data.application_user.authtoken)
            $cookies.put('uid', data.application_user.uid)
            $cookies.put('fname', data.application_user.auth_data.google.user_profile.given_name)
            $cookies.put('lname', data.application_user.auth_data.google.user_profile.family_name)
            $cookies.put('email', data.application_user.email)
            $scope.googleButtonSpin = false
            $scope.$apply()
            $state.go('dashboard')
          })
        })
      }
    })
    
    $scope.login = function () {
      $scope.loginButtonSpin = true
      var opt = {
        url : "https://api.built.io/v1/application/users/login",
        method : "post",
        headers : {
          'application_api_key' : 'bltf3d1aceb32d4fb7a',
          'content-type' : 'application/json'
        },
        form : {
          "application_user": {
            "username" : $scope.username,
            "password" : $scope.password
          }
        }
      }
      
      request(opt, function (err, res, body) {
        if (typeof body == "string"){
          body = JSON.parse(body)
          if(body.error_message){
            new PNotify({
              title: 'Oh No!',
              text: body.error_message,
              type: 'error',
              animate_speed: 'fast'
            });
          }
          if(body.application_user) {
            new PNotify({
                title: 'Success!',
                type: 'success',
                animate_speed: 'fast'
            })
            $cookies.put('auth', body.application_user.authtoken)
            $cookies.put('uid', body.application_user.uid)
            $cookies.put('fname', body.application_user.first_name)
            $cookies.put('lname', body.application_user.last_name)
            $cookies.put('email', body.application_user.email)
            $state.go('dashboard')
            PNotify.removeAll()
          }
          $scope.loginButtonSpin = false
          $scope.$apply()
        }
      })
    }
	}])
}

