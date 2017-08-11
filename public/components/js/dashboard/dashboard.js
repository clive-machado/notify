module.exports = function(app) {
	app.controller('dashboard', [ '$scope', '$state', '$rootScope', '$cookies', function ($scope, $state, $rootScope, $cookies) {
		$scope.navOne = true 
		$scope.navTwo = false	
		$scope.test = "hello"
		$scope.navButtonLogout = 'Logout'	
		$scope.title = 'Notify'
		$scope.loggedInAs = false
		$scope.email = $cookies.get('email')
		$scope.loginError = "Can\'t you sign in yet, numb nuts? ¯\\_(ツ)_/¯"
		$scope.logout = function() {
			$cookies.remove('auth')
      $cookies.remove('uid')
      $cookies.remove('fname')
      $cookies.remove('lname')
      $cookies.remove('email')
			$state.go('login')
		}
	}])
}