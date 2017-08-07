module.exports = function(app) {
	app.controller('dashboard', [ '$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
		$scope.navOne = true
		$scope.navTwo = false	
		$scope.array = [ { text: }]
		$scope.navButtonLogout = 'Logout'	
		$scope.title = 'Notify'
		$scope.loginError = "Can\'t you sign in yet, numb nuts? ¯\\_(ツ)_/¯"
		
		$scope.logout = function() {
			delete $rootScope.auth
			$state.go('login')
		}
	}])
	// .factory('getTaskList', )
}