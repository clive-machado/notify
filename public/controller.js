module.exports = function(app) {
	app.controller('mainApp', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$scope.homeHeading = "Welcome to the Gaurdian of the Notes"
		$scope.bannerline = "We are from the Galaxy Galafray our services will help you build things your slimy little brain forgets. So go ahead and Sign In." 
		$scope.navButtonOne = 'Login'
		$scope.navButtonTwo = 'Register'
		$scope.navOne = false
		$scope.navTwo = true	
		$rootScope.auth
	}])
}