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
            new PNotify({
              title: 'Oh No!',
              text: data.error_message,
              type: 'error',
              animate_speed: 'fast'
            });
          }
          if(data.application_user) {
            new PNotify({
                title: 'Success!',
                text: 'Activation email has been sent to' + data.application_user.email,
                type: 'success',
                animate_speed: 'fast'
            })
          }
          $scope.registerButtonSpin = false
          $scope.$apply()
        })
      }
	}])  
}
