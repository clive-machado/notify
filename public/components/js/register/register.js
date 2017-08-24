module.exports = function (app) {
	app.controller('registerApp', 
    [
      '$scope', 
      '$state', 
      '$rootScope', 
      '$cookies', 
      'clickEvent', 
    function($scope, $state, $rootScope, $cookies, clickEvent) {
      $scope.user = {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        fname : '',
        lname: ''
      }	  
      $scope.message
      $scope.register = function () {
        $scope.registerButtonSpin = true
        clickEvent.signup($scope.user)
        .then(function (data) {
          $scope.alert = true

          if(data.errors) { 
            var key = Object.keys(data.errors)[0]
            var value
            if(key === "email" || key === "username") {
              value = "Email Or Username " + data.errors[key][0]
            } else {
              value = data.errors[key][0]
            }
            new PNotify({
              title: 'Oh No!',
              text: value,
              type: 'error',
              animate_speed: 'fast'
            });
          }
          if(data.application_user) {
            new PNotify({
                title: 'Success!',
                text: 'Activation email has been sent to ' + data.application_user.email,
                type: 'success',
                animate_speed: 'fast'
            })
          }
          $scope.user = {
            username: '',
            password: '',
            confirm_password: '',
            fname : '',
            lname: ''
          }
          $scope.registerButtonSpin = false
          $scope.$apply()
        })
      }
	}])  
}
