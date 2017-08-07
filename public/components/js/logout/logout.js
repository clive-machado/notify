module.exports = function(app) {
	app.controller('logout', ['$rootScope', '$state', function($rootScope, $state){
		$rootScope.auth === undefined
		$state.go('login')
	}])
}