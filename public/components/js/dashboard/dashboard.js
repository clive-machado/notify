module.exports = function(app) {
	app.controller('dashboard', function ($scope) {
		$scope.login = 'Register'	
		$scope.register = 'Logout'
		$scope.title = 'Notify'
		$scope.loginError = "Can\'t you sign in yet, numb nuts? ¯\\_(ツ)_/¯"
	})
}