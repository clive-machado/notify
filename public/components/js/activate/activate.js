module.exports = function(app) {
	app.controller('activate', [ 
		'$scope', 
		'$state', 
		'$rootScope', 
		'$cookies', 
		'$location',
		'clickEvent',
		function ($scope, $state, $rootScope, $cookies, $location, clickEvent) {
			$scope.alert = false
			$scope.activateButtonSpin = false
			$scope.activate = function() {
				$scope.activateButtonSpin = true
				clickEvent.activate($location.search().token, $location.search().code)
				.then(function(data) {
					$scope.activateButtonSpin = false
					if(data.errors){
						$scope.alert = true
						$scope.alertText = data.error_message
					}
					if(data.notice){
						$state.go('login')
					}
				})
			}
	}])
}