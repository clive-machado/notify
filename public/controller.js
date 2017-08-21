module.exports = function(app) {
	app.controller('mainApp', ['$scope', '$rootScope', '$cookies', function ($scope, $rootScope, $cookies) {
		$scope.homeHeading = "Welcome to the Gaurdian of the Notes"
		$scope.bannerline = "We are from the Galaxy Galafray our services will help you build things your slimy little brain forgets. So go ahead and Sign In." 
		$scope.navButtonOne = function() {
			if(angular.isUndefined($cookies.get('auth')))
				return 'Login'
			else
				return 'Dashboard'			
		}		

		$scope.navButtonTwo = 'Register'
		$scope.loggedInAs = true
		$scope.navOne = false
		$scope.navTwo = true
	}])
}