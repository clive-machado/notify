module.exports = function(app) {
	app.controller('mainApp', ['$scope', '$rootScope', '$cookies', function ($scope, $rootScope, $cookies) {
		$scope.homeHeading = "Welcome to the Gaurdian of the Notes"
		$scope.bannerline = "We are from the Galaxy Galafray our services will help you build things your slimy little brain forgets. So go ahead and Sign In." 
		$scope.navButtonOne = function() {
			if(angular.isUndefined($cookies.get('auth'))) {
				$scope.navOne = false
				$scope.navButtonOneRoute = "login"
				return 'Login'
			}
			if(angular.isDefined($cookies.get('auth'))) {
				$scope.navOne = false
				$scope.navButtonOneRoute = "dashboard"
				return 'Dashboard'
			}
		}			

		$scope.navButtonTwo = function () {
			if(angular.isUndefined($cookies.get('auth'))){
				// $scope.navOne = false
				$scope.navButtonTwoRoute = "register"
				return 'Register'
			}
			if(angular.isDefined($cookies.get('auth'))) {
				$scope.navOne = true
			}
		}

		$scope.loggedInAs = true
		$scope.navOne = false
		$scope.navTwo = true
	}])
}