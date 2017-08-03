module.exports = function(app) {
	app.controller('mainApp', ['$scope', function ($scope) {
		$scope.homeHeading = "Welcome to the Gaurdian of the Notes"
		$scope.bannerline = "We are from the Galaxy Galafray our services will help you build things your slimy little brain forgets. So go ahead and Sign In." 
		$scope.login = 'Login'
		$scope.register = 'Register'
	}])
}